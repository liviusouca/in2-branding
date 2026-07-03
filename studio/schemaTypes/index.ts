import { localeString, localeText } from './locale';
import { siteContent } from './siteContent';
import { project } from './project';
import { chatEntry } from './chatEntry';

export const schemaTypes = [
  // reusable field types
  localeString,
  localeText,
  // documents
  siteContent,
  project,
  chatEntry,
];
