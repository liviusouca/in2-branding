import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

const SINGLETONS = ['siteContent'];

export default defineConfig({
  name: 'in2branding',
  title: 'IN2 Branding — Administrare',
  projectId: 'lyqvrbbh',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conținut')
          .items([
            S.listItem()
              .title('Texte & imagini site')
              .id('siteContent')
              .child(S.document().schemaType('siteContent').documentId('siteContent')),
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
