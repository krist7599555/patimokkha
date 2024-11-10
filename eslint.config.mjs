import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
// @ts-ignore
import civetPlugin from 'eslint-plugin-civet/ts';
// @ts-ignore
import * as justiveBetterTsBelt from 'eslint-plugin-justive-better-ts-belt';
import perfectionist from 'eslint-plugin-perfectionist';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteParser from 'svelte-eslint-parser';
import tseslint from 'typescript-eslint';

import svelteConfig from './svelte.config.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['.svelte-kit'] },
  { languageOptions: { globals: globals.browser } },
  // Rules from eslint.configs.recommended
  ...civetPlugin.configs.jsRecommended,
  // Rules from tseslint.configs.strict
  ...civetPlugin.configs.strict,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  perfectionist.configs['recommended-natural'],
  { plugins: { 'justive-better-ts-belt': { rules: justiveBetterTsBelt.rules } } },
  // Load plugin and enable processor for .civet files
  {
    files: ['*.svelte', '**/*.svelte'],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        svelteConfig,
        svelteFeatures: { runes: true }
      }
    }
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 1,
      'justive-better-ts-belt/noFlowForSingleFunction': 2,
      'justive-better-ts-belt/noPipeForSingleFunction': 2,
      'justive-better-ts-belt/preferTacitStyle': 2,
      'no-misleading-character-class': 0,
      'perfectionist/sort-imports': ['error', { order: 'asc', type: 'natural' }]
    }
  }
];
