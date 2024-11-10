import dsv from '@rollup/plugin-dsv';
import { sveltekit } from '@sveltejs/kit/vite';
import { MagicRegExpTransformPlugin } from 'magic-regexp/transform';
import { defineConfig } from 'vite';
// "@mobily/ts-belt/*": ["../node_modules/@mobily/ts-belt/dist/types/*"]

export default defineConfig({
  plugins: [MagicRegExpTransformPlugin.vite(), sveltekit(), dsv()],
  ssr: {
    noExternal: ['@mobily/ts-belt']
  }
});
