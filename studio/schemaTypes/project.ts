import { defineType, defineField } from 'sanity';

// A portfolio project (shown on the Portfolio page).
export const project = defineType({
  name: 'project',
  title: 'Proiect (portofoliu)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titlu',
      type: 'localeString',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descriere',
      type: 'localeText',
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagine principală',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie (imagini suplimentare)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'order',
      title: 'Ordine (număr; mai mic = mai sus)',
      type: 'number',
      initialValue: 100,
    }),
    defineField({
      name: 'featured',
      title: 'Proiect principal (afișat mare, sus)',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  orderings: [
    { title: 'Ordine', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title.pl', media: 'coverImage' },
    prepare: ({ title, media }) => ({ title: title || 'Proiect fără titlu', media }),
  },
});
