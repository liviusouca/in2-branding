// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://in2branding.pl',
  i18n: {
    locales: ['pl', 'en', 'ro'],
    defaultLocale: 'pl',
    routing: {
      prefixDefaultLocale: true, // /pl, /en, /ro — all prefixed
      redirectToDefaultLocale: true,
    },
  },
  redirects: {
    '/': '/pl/',
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
