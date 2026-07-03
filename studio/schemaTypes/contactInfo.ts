import { defineType, defineField } from 'sanity';

// Singleton: contact page details.
export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact',
  type: 'document',
  fields: [
    defineField({ name: 'person', title: 'Persoană', type: 'string' }),
    defineField({ name: 'role', title: 'Rol', type: 'localeString' }),
    defineField({ name: 'email', title: 'E-mail', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
    defineField({ name: 'website', title: 'Website', type: 'string' }),
    defineField({ name: 'instagram', title: 'Instagram (URL)', type: 'url' }),
    defineField({ name: 'facebook', title: 'Facebook (URL)', type: 'url' }),
  ],
  preview: { prepare: () => ({ title: 'Contact' }) },
});
