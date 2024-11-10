<script lang="ts">
  import type { KeyboardEventHandler } from 'svelte/elements';

  import { createPatimokeAST } from '$lib/patimokkha.svelte';
  import { fly } from 'svelte/transition';

  import PaliNodeViewer from './PaliNodeViewer.svelte';

  let patimokAST = $state(createPatimokeAST());
  let curr = $state(patimokAST);

  function next() {
    if (curr.firstChild) {
      return (curr = curr.firstChild);
    }

    while (true) {
      if (curr.nextSibling) return (curr = curr.nextSibling);
      if (curr.parentNode) {
        curr = curr.parentNode;
      } else {
        curr = patimokAST;
      }
    }
  }
  function prev() {
    curr = curr.prevSibling ?? curr.parentNode ?? curr;
  }
  let onkeydown: KeyboardEventHandler<EventTarget> = (e) => {
    console.log(e.code);
    if (e.code === 'ArrowLeft') return prev();
    if (e.code === 'Space') return next();
    if (e.code === 'ArrowRight') return next();
  };
</script>

<svelte:window {onkeydown} />
<div class="w-dvh grid place-content-center text-center">
  <PaliNodeViewer node={curr} />
  <!-- {#key curr.pali}
    <div class="col-start-1 row-start-1 max-w-[500px]" transition:fly={{ duration: 100 }}>
      <p class="text-sm opacity-50">{curr.name}</p>
      <p class="bold mt-4 hyphens-none whitespace-pre-wrap break-words text-2xl">{curr?.pali}</p>
      <p class="mt-2 opacity-50">{curr?.thai}</p>
      <button onclick={() => prev()}>prev</button>
      <button onclick={() => next()}>next</button>
    </div>
  {/key} -->
</div>
