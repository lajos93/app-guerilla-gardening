export function isMedia(doc: unknown): doc is { url: string } {
  return typeof doc === 'object' && doc !== null && 'url' in doc
}
