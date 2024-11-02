import type { Config } from 'tailwindcss';

import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

export default {
  plugins: [typography, forms, containerQueries, aspectRatio],

  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {}
  }
} satisfies Config;
