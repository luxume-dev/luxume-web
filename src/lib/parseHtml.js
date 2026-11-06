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
  return renderHtml(input, INLINE_CONFIG);
}

/**
 * Like parseHtml, for longer content written in the dashboard's rich-text
 * editor (company pages): paragraphs, headings, lists, quotes, rules and links.
 *
 * - Only RICH_TAGS become elements, each with the site's styling (RICH_CLASSES).
 * - Links keep their href only when it is http(s), mailto, tel or a path on
 *   this site; anything else (javascript: ...) renders as plain text.
 * - text-align (left / center / right / justify) is the only style kept.
 * - Every other attribute is dropped.
 * - options.components replaces the element for a tag (e.g. styled list
 *   items): { li: (props, children) => node }. props holds key, className and
 *   the kept attributes; children are the already-rendered contents.
 * - options.classes replaces the class of a tag (e.g. the blog's own text
 *   styles): { p: 'text-gray-600 mb-4' }.
 * - Tables (table / thead / tbody / tr / th / td) are rendered inside a
 *   horizontally scrolling box; cells keep colspan / rowspan.
 *
 * @param {string} input
 * @param {{
 *   components?: Record<string, (props: object, children: import('react').ReactNode[]) => import('react').ReactNode>,
 *   classes?: Record<string, string>,
 * }} [options]
 * @returns {import('react').ReactNode}
 */
export function parseRichHtml(input, options) {
  const { components, classes } = options ?? {};
  if (!components && !classes) return renderHtml(input, RICH_CONFIG);
  return renderHtml(input, {
    ...RICH_CONFIG,
    components: { ...RICH_CONFIG.components, ...components },
    props: (tag, rawAttrs) => {
      const props = RICH_CONFIG.props(tag, rawAttrs);
      if (props && classes?.[tag] !== undefined) props.className = classes[tag];
      return props;
    },
  });
}

function renderHtml(input, config) {
  if (typeof input !== 'string' || input === '') return null;

  const root = { tag: null, allowed: false, children: [] };
  const stack = [root];
  let key = 0;
  let lastIndex = 0;

  const current = () => stack[stack.length - 1];
  const pushText = (text) => {
    if (!text) return;
    // Text directly inside table structure is invalid HTML (React warns on
    // hydration); it is only ever whitespace between rows/cells
    if (TABLE_STRUCTURE.has(current().tag)) return;
    current().children.push(decodeEntities(text));
  };

  // Turn an open frame into a node and add it to its parent
  const closeFrame = () => {
    const frame = stack.pop();
    const parent = current();
    const component = frame.allowed ? config.components?.[frame.tag] : undefined;
    if (component) {
      parent.children.push(component({ key: key++, ...frame.props }, frame.children));
    } else if (frame.allowed) {
      parent.children.push(createElement(frame.tag, { key: key++, ...frame.props }, ...frame.children));
    } else {
      parent.children.push(...frame.children);
    }
  };

  TAG_PATTERN.lastIndex = 0;
  let match;
  while ((match = TAG_PATTERN.exec(input)) !== null) {
    pushText(input.slice(lastIndex, match.index));
    lastIndex = TAG_PATTERN.lastIndex;

    const [, closing, rawName, rawAttrs, selfClosing] = match;
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
      if (config.tags.has(tag)) {
        current().children.push(createElement(tag, { key: key++, ...config.props(tag, rawAttrs) }));
      }
      continue;
    }

    let allowed = config.tags.has(tag);
    const props = allowed ? config.props(tag, rawAttrs) : undefined;
    // false = drop the tag but keep its text (e.g. a link without a safe href)
    if (props === false) allowed = false;
    stack.push({ tag, allowed, props: props || undefined, children: [] });
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

// Groups: 1 = "/" for a closing tag, 2 = tag name, 3 = attributes, 4 = "/" for self-closing.
// Requires a letter after "<", so text like "5 < 6" stays text.
const TAG_PATTERN = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)\b((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>/g;

const INLINE_CONFIG = { tags: ALLOWED_TAGS, props: () => undefined };

// ==================== RICH TEXT ====================

// Tags of the dashboard's rich-text editor, with the classes the website styles them with
const RICH_CLASSES = {
  p: 'mb-4',
  h2: 'aloevera-medium text-2xl text-[#0F172B] mt-8 mb-4',
  h3: 'aloevera-medium text-xl text-[#0F172B] mt-6 mb-3',
  h4: 'aloevera-medium text-lg text-[#0F172B] mt-5 mb-2',
  ul: 'list-disc pl-6 mb-4 space-y-2 [&_ul]:list-[circle] [&_ul]:mt-2 [&_ul]:mb-0 [&_ol]:mt-2 [&_ol]:mb-0',
  ol: 'list-decimal pl-6 mb-4 space-y-2 [&_ul]:mt-2 [&_ul]:mb-0 [&_ol]:mt-2 [&_ol]:mb-0',
  li: 'pl-1',
  a: 'text-[#C83C64] underline underline-offset-2 hover:text-[#a83254]',
  blockquote: 'border-l-4 border-[#C83C64] pl-4 my-6 italic text-gray-700',
  hr: 'my-8 border-gray-200',
  strong: 'font-semibold text-[#0F172B]',
  s: 'line-through',
  table: 'w-full min-w-[32rem] border-collapse text-sm sm:text-base',
  thead: 'bg-gray-50',
  tbody: '',
  tr: 'border-b border-gray-200 last:border-b-0',
  th: 'border border-gray-200 px-4 py-3 text-left align-top font-semibold text-[#0F172B]',
  td: 'border border-gray-200 px-4 py-3 text-left align-top',
};

const RICH_TAGS = new Set([...Object.keys(RICH_CLASSES), 'br', 'b', 'em', 'i', 'u', 'sub', 'sup']);

const ALIGNABLE = new Set(['p', 'h2', 'h3', 'h4', 'li', 'th', 'td']);

// Table elements that may only hold other elements
const TABLE_STRUCTURE = new Set(['table', 'thead', 'tbody', 'tr']);

// colspan / rowspan of a cell (1-50)
const span = (value) => {
  const n = parseInt(value ?? '', 10);
  return n > 1 && n <= 50 ? n : undefined;
};

const RICH_CONFIG = {
  tags: RICH_TAGS,
  // Wide tables scroll sideways on small screens instead of overflowing the page
  components: {
    table: (props, children) =>
      createElement(
        'div',
        { key: props.key, className: 'mb-6 overflow-x-auto' },
        createElement('table', { ...props, key: undefined }, ...children)
      ),
  },
  // Props for an element; false drops the tag (its text is kept)
  props(tag, rawAttrs) {
    const props = RICH_CLASSES[tag] ? { className: RICH_CLASSES[tag] } : {};
    const attrs = readAttributes(rawAttrs);

    if (tag === 'th' || tag === 'td') {
      const colSpan = span(attrs.colspan);
      const rowSpan = span(attrs.rowspan);
      if (colSpan) props.colSpan = colSpan;
      if (rowSpan) props.rowSpan = rowSpan;
    }

    if (tag === 'a') {
      const href = safeHref(attrs.href);
      if (!href) return false;
      props.href = href;
      if (/^https?:/i.test(href)) {
        props.target = '_blank';
        props.rel = 'noopener noreferrer';
      }
    }

    if (ALIGNABLE.has(tag)) {
      const align = /text-align\s*:\s*(left|center|right|justify)/i.exec(attrs.style ?? '');
      if (align) props.style = { textAlign: align[1].toLowerCase() };
    }

    return props;
  },
};

// http(s), mailto, tel, or a path / anchor on this site
function safeHref(raw) {
  // Control characters and spaces can hide a "javascript:" scheme
  const href = (raw ?? '').replace(/[\u0000- \u007f]/g, '');
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href;
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  if (href.startsWith('#')) return href;
  return null;
}

// name="value" pairs of a tag: lower-case names, entities decoded
function readAttributes(raw) {
  const attrs = {};
  if (!raw) return attrs;
  const pattern = /([^\s"'=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let m;
  while ((m = pattern.exec(raw)) !== null) {
    attrs[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? m[4] ?? '');
  }
  return attrs;
}

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
