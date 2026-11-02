import { createElement, Fragment } from 'react';

/**
 * Render a small, safe subset of HTML from dashboard text as React nodes.
 *
 * Dashboard fields are plain text, but editors type things like `<br>`,
 * `&nbsp;` or `<strong>`. This turns those into real elements WITHOUT
 * dangerouslySetInnerHTML:
 *
 * - Only the tags in ALLOWED_TAGS become elements. Every attribute is dropped,
 *   so no href / style / on* handlers can get through.
 * - Any other tag is removed but its text is kept (`<div>Hi</div>` -> `Hi`).
 * - script / style / iframe etc. are removed together with their content.
 * - Entities (`&nbsp;`, `&amp;`, `&#169;`, `&#x2014;`) are decoded. All text is
 *   still escaped by React when rendered.
 * - Newlines are left as text; pair with `whitespace-pre-line` to show them.
 *
 * Pure and deterministic, so it renders identically on server and client.
 *
 * @param {string} input
 * @returns {import('react').ReactNode}
 */
export function parseHtml(input) {
  if (typeof input !== 'string' || input === '') return null;

  const root = { tag: null, allowed: false, children: [] };
  const stack = [root];
  let key = 0;
  let lastIndex = 0;

  const current = () => stack[stack.length - 1];
  const pushText = (text) => {
    if (text) current().children.push(decodeEntities(text));
  };

  // Turn an open frame into a node and add it to its parent
  const closeFrame = () => {
    const frame = stack.pop();
    const parent = current();
    if (frame.allowed) {
      parent.children.push(createElement(frame.tag, { key: key++ }, ...frame.children));
    } else {
      parent.children.push(...frame.children);
    }
  };

  TAG_PATTERN.lastIndex = 0;
  let match;
  while ((match = TAG_PATTERN.exec(input)) !== null) {
    pushText(input.slice(lastIndex, match.index));
    lastIndex = TAG_PATTERN.lastIndex;

    const [, closing, rawName, selfClosing] = match;
    if (!rawName) continue; // HTML comment

    const tag = rawName.toLowerCase();

    if (closing) {
      // Close the nearest matching open tag, implicitly closing any inside it;
      // a stray closing tag is ignored.
      const depth = stack.findLastIndex((frame) => frame.tag === tag);
      if (depth > 0) {
        while (stack.length > depth) closeFrame();
      }
      continue;
    }

    if (DROP_WITH_CONTENT.has(tag)) {
      // Skip everything up to and including the matching closing tag
      const end = input.toLowerCase().indexOf(`</${tag}`, lastIndex);
      const close = end === -1 ? -1 : input.indexOf('>', end);
      lastIndex = close === -1 ? input.length : close + 1;
      TAG_PATTERN.lastIndex = lastIndex;
      continue;
    }

    if (VOID_TAGS.has(tag) || selfClosing) {
      if (ALLOWED_TAGS.has(tag)) {
        current().children.push(createElement(tag, { key: key++ }));
      }
      continue;
    }

    stack.push({ tag, allowed: ALLOWED_TAGS.has(tag), children: [] });
  }

  pushText(input.slice(lastIndex));
  // Unclosed tags are closed at the end
  while (stack.length > 1) closeFrame();

  const { children } = root;
  if (children.length === 0) return null;
  if (children.length === 1) return children[0];
  return createElement(Fragment, null, ...children);
}

// ==================== CONFIG ====================

// Inline formatting editors may use. Extend with care: attributes are always
// dropped, so tags that need them (a, img) would render broken anyway.
const ALLOWED_TAGS = new Set(['br', 'strong', 'b', 'em', 'i', 'u', 'span', 'small', 'mark', 'sup', 'sub']);

const VOID_TAGS = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'wbr', 'source', 'area', 'base', 'col', 'embed', 'param', 'track']);

const DROP_WITH_CONTENT = new Set(['script', 'style', 'iframe', 'object', 'template', 'noscript', 'textarea', 'title', 'svg', 'math']);

// Groups: 1 = "/" for a closing tag, 2 = tag name, 3 = "/" for self-closing.
// Requires a letter after "<", so text like "5 < 6" stays text.
const TAG_PATTERN = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b(?:[^>"']|"[^"]*"|'[^']*')*?(\/?)>/g;

// ==================== ENTITIES ====================

const NAMED_ENTITIES = {
  nbsp: ' ',
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  copy: '©',
  reg: '®',
  trade: '™',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
  laquo: '«',
  raquo: '»',
  bull: '•',
  middot: '·',
  times: '×',
  divide: '÷',
  deg: '°',
  plusmn: '±',
  frac12: '½',
  frac14: '¼',
  frac34: '¾',
  sup2: '²',
  sup3: '³',
  euro: '€',
  pound: '£',
  yen: '¥',
  cent: '¢',
  rupee: '₹',
  sect: '§',
  para: '¶',
  shy: '­',
  ensp: ' ',
  emsp: ' ',
  thinsp: ' ',
  zwnj: '‌',
  zwj: '‍',
};

function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z][a-z0-9]*);/gi, (entity, body) => {
    if (body[0] === '#') {
      const code = body[1] === 'x' || body[1] === 'X'
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      const valid = code > 0 && code <= 0x10ffff && (code < 0xd800 || code > 0xdfff);
      return valid ? String.fromCodePoint(code) : entity;
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? entity;
  });
}
