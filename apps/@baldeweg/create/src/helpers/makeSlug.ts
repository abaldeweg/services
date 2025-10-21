/**
 * makeSlug replaces special characters in a string to create a slug suitable for filenames.
 * It replaces "/" with "_" and removes any other non-alphanumeric characters except underscores and hyphens.
 */
export function makeSlug(term: string): string {
  return term.replace(/\//g, '_').replace(/[^a-zA-Z0-9_-]+/g, '');
}
