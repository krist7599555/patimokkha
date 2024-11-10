<script lang="ts">
  import type { KeyboardEventHandler } from 'svelte/elements';

  import type { PageData } from './$types';

  import { default as ptm_ } from './ptm3lang.csv';

  let { data }: PageData = $props();

  const ptm = ptm_ as {
    order: string;
    pali: string;
    roman: string;
    sectionId: string;
    sectionLabel: string;
    thai: string;
    tran: string;
  }[];

  const pageMin = 1;
  const pageMax = ptm.length;
  let page = $state(1);
  const navPrevPage = () => (page -= 1);
  const navNextPage = () => (page += 1);
  $effect(() => {
    page = Math.min(pageMax, Math.max(pageMin, page));
  });
  let curr = $derived(ptm.at(page - 1) || ptm[0]);
  let onkeydown: KeyboardEventHandler<EventTarget> = (e) => {
    console.log(e.code);
    if (e.code === 'ArrowLeft') return navPrevPage();
    if (e.code === 'Space') return navNextPage();
    if (e.code === 'ArrowRight') return navNextPage();
  };
</script>

<section class="grid grid-cols-3 gap-8 p-20">
  <p class="col-span-full whitespace-pre-line text-xs opacity-50 [white-space-collapse:preserve]">
    {curr.sectionLabel} / {curr.order}
  </p>
  <p class="whitespace-pre-line">{curr.pali}</p>
  <p class="whitespace-pre-line">{curr.thai}</p>
  <p class="whitespace-pre-line">{curr.tran}</p>
</section>

<svelte:window {onkeydown} />
<div class="absolute inset-x-0 bottom-0 flex justify-center gap-2 border-t bg-white p-2">
  <button class="w-12 rounded border shadow" onclick={navPrevPage} disabled={page == pageMin}
    >-</button
  >
  <input
    class="w-20 rounded border text-center"
    type="number"
    bind:value={page}
    min={pageMin}
    max={pageMax}
  />
  <button class="w-12 rounded border shadow" onclick={navNextPage} disabled={page == pageMax}
    >+</button
  >
</div>
