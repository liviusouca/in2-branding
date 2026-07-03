import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { assist } from '@sanity/assist';
import { languageFilter } from '@sanity/language-filter';
import { schemaTypes } from './schemaTypes';

const SINGLETONS = ['siteContent', 'contactInfo'];

export default defineConfig({
  name: 'in2branding',
  title: 'IN2 Branding — Administrare',
  projectId: 'nd73gga6',
  dataset: 'production',
  plugins: [
    // Language selector: pick the editing language, hide the others.
    languageFilter({
      supportedLanguages: [
        { id: 'pl', title: 'Polski' },
        { id: 'en', title: 'English' },
        { id: 'ro', title: 'Română' },
      ],
      defaultLanguages: ['pl'],
      documentTypes: ['siteContent', 'contactInfo', 'project', 'chatEntry'],
      filterField: (enclosingType, member, selectedLanguageIds) =>
        !enclosingType.name.startsWith('locale') ||
        !('name' in member) ||
        selectedLanguageIds.includes(member.name),
    }),
    // AI translation: edit one language, auto-translate to the others.
    assist({
      translate: {
        field: {
          documentTypes: ['siteContent', 'contactInfo', 'project', 'chatEntry'],
          languages: [
            { id: 'pl', title: 'Polski' },
            { id: 'en', title: 'English' },
            { id: 'ro', title: 'Română' },
          ],
        },
      },
    }),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conținut')
          .items([
            S.listItem()
              .title('Texte & imagini site')
              .id('siteContent')
              .child(S.document().schemaType('siteContent').documentId('siteContent')),
            S.listItem()
              .title('Contact')
              .id('contactInfo')
              .child(S.document().schemaType('contactInfo').documentId('contactInfo')),
            S.divider(),
            S.documentTypeListItem('project').title('Proiecte (portofoliu)'),
            S.documentTypeListItem('chatEntry').title('Întrebări chat'),
          ]),
    }),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((t) => !SINGLETONS.includes(t.schemaType)),
  },
  document: {
    actions: (input, context) =>
      SINGLETONS.includes(context.schemaType)
        ? input.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : input,
  },
});
