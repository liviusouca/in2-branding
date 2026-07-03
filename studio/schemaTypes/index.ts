import { localeString, localeText } from './locale';
import { siteContent } from './siteContent';
import { contactInfo } from './contactInfo';
import { project } from './project';
import { chatEntry } from './chatEntry';

export const schemaTypes = [
  // reusable field types
  localeString,
  localeText,
  // documents
  siteContent,
  contactInfo,
  project,
  chatEntry,
];
