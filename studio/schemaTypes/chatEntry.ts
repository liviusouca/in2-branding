import { defineType, defineField } from 'sanity';

// A single question/answer used by the site chat assistant.
export const chatEntry = defineType({
  name: 'chatEntry',
  title: 'Întrebare chat',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Întrebare (etichetă)',
      type: 'localeString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Răspuns',
      type: 'localeText',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'keywordsPl',
      title: 'Cuvinte-cheie PL (separate prin virgulă)',
      type: 'string',
      description: 'Cuvinte după care botul recunoaște întrebarea, în poloneză.',
    }),
    defineField({
      name: 'keywordsEn',
      title: 'Cuvinte-cheie EN',
      type: 'string',
    }),
    defineField({
      name: 'keywordsRo',
      title: 'Cuvinte-cheie RO',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Ordine',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    { title: 'Ordine', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'question.pl' },
    prepare: ({ title }) => ({ title: title || 'Întrebare fără titlu' }),
  },
});
