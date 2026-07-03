import { defineType, defineField } from 'sanity';

// Singleton: all editable page texts (hero, sections, contact, footer).
// Images that belong to fixed sections live here too.
export const siteContent = defineType({
  name: 'siteContent',
  title: 'Texte & imagini site',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'who', title: 'Kim jesteśmy' },
    { name: 'why', title: 'Dlaczego My' },
    { name: 'how', title: 'Jak pracujemy' },
    { name: 'gifts', title: 'Zestawy prezentowe' },
    { name: 'work', title: 'Portofoliu (intro)' },
    { name: 'cta', title: 'CTA' },
  ],
  fields: [
    // Hero
    defineField({ name: 'heroKicker', title: 'Hero — eyebrow', type: 'localeString', group: 'hero' }),
    defineField({ name: 'heroTitle', title: 'Hero — titlu', type: 'localeString', group: 'hero' }),
    defineField({ name: 'heroSubtitle', title: 'Hero — subtitlu', type: 'localeText', group: 'hero' }),
    // Who we are
    defineField({ name: 'whoTitle', title: 'Titlu secțiune', type: 'localeString', group: 'who' }),
    defineField({
      name: 'whoItems', title: 'Puncte', type: 'array', group: 'who',
      of: [{ type: 'object', fields: [{ name: 'text', title: 'Text', type: 'localeText' }] }],
    }),
    defineField({ name: 'whoHighlight', title: 'Frază evidențiată', type: 'localeString', group: 'who' }),
    defineField({ name: 'whoImage', title: 'Imagine', type: 'image', options: { hotspot: true }, group: 'who' }),
    // Why
    defineField({ name: 'whyTitle', title: 'Titlu secțiune', type: 'localeString', group: 'why' }),
    defineField({
      name: 'whyItems', title: 'Diferențiatori (listă)', type: 'array', group: 'why',
      of: [{ type: 'localeString' }],
    }),
    // How we work
    defineField({ name: 'howTitle', title: 'Titlu secțiune', type: 'localeString', group: 'how' }),
    defineField({
      name: 'howSteps', title: 'Pași', type: 'array', group: 'how',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Titlu pas', type: 'localeString' },
        { name: 'text', title: 'Text pas', type: 'localeText' },
      ] }],
    }),
    defineField({ name: 'howImage', title: 'Imagine (schițe)', type: 'image', options: { hotspot: true }, group: 'how' }),
    // Gift sets
    defineField({ name: 'giftsTitle', title: 'Titlu secțiune', type: 'localeString', group: 'gifts' }),
    defineField({ name: 'giftsDescription', title: 'Descriere', type: 'localeText', group: 'gifts' }),
    defineField({
      name: 'giftsItems', title: 'Puncte', type: 'array', group: 'gifts',
      of: [{ type: 'localeString' }],
    }),
    defineField({ name: 'giftsHighlight', title: 'Frază evidențiată', type: 'localeString', group: 'gifts' }),
    defineField({ name: 'giftsImage', title: 'Imagine (set cadou)', type: 'image', options: { hotspot: true }, group: 'gifts' }),
    // Our work intro
    defineField({ name: 'workTitle', title: 'Titlu', type: 'localeString', group: 'work' }),
    defineField({ name: 'workSubtitle', title: 'Subtitlu', type: 'localeString', group: 'work' }),
    defineField({ name: 'workIntro', title: 'Intro', type: 'localeText', group: 'work' }),
    defineField({ name: 'workFeatureImage', title: 'Imagine principală (lineup)', type: 'image', options: { hotspot: true }, group: 'work' }),
    // CTA
    defineField({ name: 'ctaTitle', title: 'Titlu', type: 'localeString', group: 'cta' }),
    defineField({ name: 'ctaDescription', title: 'Descriere', type: 'localeText', group: 'cta' }),
    defineField({ name: 'ctaImage', title: 'Imagine (cutie cadou)', type: 'image', options: { hotspot: true }, group: 'cta' }),
  ],
  preview: { prepare: () => ({ title: 'Texte & imagini site' }) },
});
