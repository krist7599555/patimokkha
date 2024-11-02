<script lang="ts">
  import type { KeyboardEventHandler } from 'svelte/elements';

  import { default as patimoke } from '$lib/patimoke.json';
  import { fly } from 'svelte/transition';

  let page = $state(0);
  let curr = $derived.by(() => {
    let res = patimoke.at(page) ?? patimoke[0];
    res.pali = res.pali.replaceAll('_', '');
    return res;
  });

  function next() {
    page += 1;
  }
  function prev() {
    page = Math.max(0, page - 1);
  }
  let onkeydown: KeyboardEventHandler<EventTarget> = (e) => {
    console.log(e.code);
    if (e.code === 'ArrowLeft') return prev();
    if (e.code === 'Space') return next();
    if (e.code === 'ArrowRight') return next();
  };
</script>

<svelte:window {onkeydown} />
<div class="w-dvh grid h-dvh place-content-center text-center">
  {#key curr.pali}
    <div class="col-start-1 row-start-1 max-w-[500px]" transition:fly={{ duration: 100 }}>
      <p class="text-sm opacity-50">{curr?.breadcrumb} / {page + 1}</p>
      <p class="bold mt-4 hyphens-none whitespace-pre-wrap break-words text-2xl">{curr?.pali}</p>
      <p class="mt-2 opacity-50">{curr?.thai}</p>
      <button onclick={() => prev()}>prev</button>
      <button onclick={() => next()}>next</button>
    </div>
  {/key}
</div>
