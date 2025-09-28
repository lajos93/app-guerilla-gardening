export function slugify(name: string): string {
  return name
    .normalize('NFD') // unicode normalization
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .toLowerCase()
    .replace(/\s+/g, '-') // dash instead of spaces
    .replace(/[^a-z0-9-]/g, '') // remove everything that is not alphanumeric or dash
}
