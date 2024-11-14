<script lang="ts">
  import type { KeyboardEventHandler } from 'svelte/elements';

  import type { PageData } from '../ptm/$types';

  import { default as ptm_ } from './patim.json';

  // let { data }: PageData = $props();
  type Patim = (typeof ptm_)[number];
  const patims = ptm_ as Patim[];

  const pageMin = 1;
  const pageMax = patims.length;
  let page = $state(1);
  const navPrevPage = () => (page -= 1);
  const navNextPage = () => (page += 1);
  $effect(() => {
    page = Math.min(pageMax, Math.max(pageMin, page));
  });
  let curr = $derived(patims.at(page - 1) || patims[0]);
  const LANGS = ['pali', 'thai', 'tran'] as const;
  type Lang = (typeof LANGS)[number];
  let lang = $state<Lang>('pali');
  let onkeydown: KeyboardEventHandler<EventTarget> = (e) => {
    if (e.code === 'ArrowLeft') return navPrevPage();
    if (e.code === 'Space') return navNextPage();
    if (e.code === 'ArrowRight') return navNextPage();
    if (e.code === 'Slash') {
      lang = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
      return;
    }
  };
</script>

<section class="mx-auto grid max-w-[80ch] gap-8 p-20">
  <p class="col-span-full whitespace-pre-line text-xs opacity-50 [white-space-collapse:preserve]">
    {curr.sectionLabel}
    {#if curr.bulletOrder}
      ข้อที่ {curr.bulletOrder}
    {/if}
  </p>
  {#each curr.chants as chant (chant)}
    <p
      class="whitespace-pre-line text-xl {chant.type === 'p'
        ? 'indent-4'
        : chant.type === 'b'
          ? 'text-center text-3xl font-bold'
          : ''}"
    >
      {chant[lang]}
    </p>
  {/each}
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

  {#each LANGS as l (l)}
    <button
      class="rounded px-2 {lang === l ? 'bg-slate-600 text-white' : 'border'}"
      onclick={() => {
        lang = l;
      }}>{l}</button
    >
  {/each}
</div>
