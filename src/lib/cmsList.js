/**
 * Helpers for dashboard repeatable fields: text columns holding JSON string
 * arrays that line up by index (e.g. card_title[n] + card_description[n]).
 */

/** Parse one column. Also accepts an already-parsed array or a plain string. */
export function parseList(value) {
  if (Array.isArray(value)) return value.map((v) => String(v ?? ''));
  if (typeof value !== 'string' || value.trim() === '') return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map((v) => String(v ?? ''));
  } catch {
    // not JSON: a single plain value
  }
  return [value];
}

/**
 * Zip several columns into items, e.g.
 * zipLists({ title: row.card_title, description: row.card_description })
 * -> [{ title, description }, ...]. Values are trimmed; fully empty items are dropped.
 */
export function zipLists(columns) {
  const lists = Object.entries(columns).map(([key, value]) => [key, parseList(value)]);
  const count = Math.max(0, ...lists.map(([, list]) => list.length));
  return Array.from({ length: count }, (_, i) =>
    Object.fromEntries(lists.map(([key, list]) => [key, (list[i] ?? '').trim()]))
  ).filter((item) => Object.values(item).some(Boolean));
}

/**
 * An icon is either pasted SVG markup or the URL of an uploaded file. SVG is
 * shown through an <img> data URI rather than injected into the page, so any
 * script or event handler inside it can never run. "currentColor" is swapped
 * for `color`, and xmlns (required by <img>) is added when missing.
 */
export function iconSrc(icon, color) {
  if (!icon) return '';
  if (!icon.startsWith('<')) return icon;
  if (!/<svg\b/i.test(icon)) return '';
  let svg = color ? icon.replace(/currentColor/gi, color) : icon;
  if (!/<svg\b[^>]*\bxmlns\s*=/i.test(svg)) {
    svg = svg.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
