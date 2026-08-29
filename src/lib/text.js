/**
 * Trim text to a meta-description-sized summary.
 *
 * Search engines truncate around 155-160 characters, so anything longer is
 * wasted and reads as cut off in the SERP. Cuts on a word boundary and strips
 * trailing punctuation before appending the ellipsis.
 */
export function summarise(text, limit = 155) {
  if (typeof text !== 'string') return undefined;

  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return undefined;
  if (clean.length <= limit) return clean;

  const clipped = clean.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : limit).replace(/[,;:.\-–—]$/, '')}…`;
}
