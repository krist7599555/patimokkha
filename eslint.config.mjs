import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
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
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...svelte.configs['flat/recommended'],
  perfectionist.configs['recommended-line-length'],
  { plugins: { 'justive-better-ts-belt': { rules: justiveBetterTsBelt.rules } } },
  {
    languageOptions: {
      parserOptions: {
        svelteFeatures: { runes: true },
        parser: tsParser,
        svelteConfig
      },
      parser: svelteParser
    },
    files: ['*.svelte', '**/*.svelte']
  },
  {
    rules: {
      'perfectionist/sort-imports': ['error', { type: 'natural', order: 'asc' }],
      'justive-better-ts-belt/noPipeForSingleFunction': 2,
      'justive-better-ts-belt/noFlowForSingleFunction': 2,
      'justive-better-ts-belt/preferTacitStyle': 2
    }
  }
];
