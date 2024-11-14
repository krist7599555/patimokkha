<script lang="ts">
  import type { PaliNode, tokenizePaliText } from './patimokkha';

  import { paliToThai, thaiWithDash } from '$lib/pali-convert';

  import Self from './PaliNodeViewer.svelte';
  let { node = $bindable() }: { node: PaliNode } = $props();
  let chlidVisible = $state([...(node.children ?? []).map(() => true)]);
</script>

{#if node.kind === 'section'}
  <div class="">
    <div class="sticky top-0 z-30 border-b bg-white p-2 text-2xl font-bold">
      {node.name}
    </div>

    {#each node.children as ch, idx}
      {#if chlidVisible[idx] || ch.kind === 'section'}
        <div class={ch.kind === 'section' ? '' : ''}>
          <Self node={ch} />
        </div>
      {:else}
        <button class="rounded border p-1" onclick={() => (chlidVisible[idx] = !chlidVisible[idx])}
          >+</button
        >
      {/if}
    {/each}
  </div>
{:else if node.kind === 'verse'}
  <div class="relative mx-auto text-left {node.pali.endsWith('.') ? 'mb-6' : ''}">
    <div class="flex max-w-[60ch] flex-nowrap">
      {#each node.computeTokens() as token}
        <div data-token={token.pali} class="mr-2">
          <div class="whitespace-pre">{token.pali}</div>
          <div class="text-xs opacity-50">{thaiWithDash(paliToThai(token.pali))}</div>
        </div>
      {/each}
    </div>
    <div class="text-xs opacity-50">{node.thai}</div>
  </div>
{/if}
