import { defineType, defineField } from 'sanity';

// Reusable 3-language field types (PL / EN / RO).
const LANGS = [
  { id: 'pl', title: 'Polski' },
  { id: 'en', title: 'English' },
  { id: 'ro', title: 'Română' },
];

export const localeString = defineType({
  name: 'localeString',
  title: 'Text (3 limbi)',
  type: 'object',
  fields: LANGS.map((l) =>
    defineField({ name: l.id, title: l.title, type: 'string' })
  ),
  options: { collapsible: true, collapsed: false },
});

export const localeText = defineType({
  name: 'localeText',
  title: 'Text lung (3 limbi)',
  type: 'object',
  fields: LANGS.map((l) =>
    defineField({ name: l.id, title: l.title, type: 'text', rows: 3 })
  ),
  options: { collapsible: true, collapsed: false },
});
