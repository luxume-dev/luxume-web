/**
 * Blog content is HTML written in the dashboard's rich-text editor. Posts not
 * re-saved since that editor was added still hold the older array of blocks
 * ({ type: 'heading' | 'paragraph' | 'bullets' | 'numbered_list', ... }).
 */

export const isHtmlContent = (content) => typeof content === 'string';

const NAMED = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", '#39': "'" };

// Plain text of an HTML fragment (for excerpts and meta descriptions)
function htmlToText(html) {
  return html
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .replace(/&(nbsp|amp|lt|gt|quot|apos|#39);/g, (_, name) => NAMED[name])
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Text of the post's first non-empty paragraph.
 * @param {string | Array<object> | null | undefined} content
 * @returns {string}
 */
export function firstParagraph(content) {
  if (isHtmlContent(content)) {
    for (const match of content.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)) {
      const text = htmlToText(match[1]);
      if (text) return text;
    }
    return '';
  }
  if (!Array.isArray(content)) return '';
  const para = content.find(
    (block) => block?.type === 'paragraph' && typeof block.content === 'string' && block.content.trim()
  );
  return para?.content.trim() || '';
}

// The blog post's text styles (same look as the older block renderer)
export const BLOG_RICH_CLASSES = {
  p: 'text-gray-600 leading-relaxed mb-4 text-sm sm:text-base',
  h2: 'font-lato font-bold text-gray-900 text-xl sm:text-2xl mt-8 mb-4',
  h3: 'font-lato font-bold text-gray-900 text-lg sm:text-xl mt-6 mb-3',
  h4: 'font-lato font-bold text-gray-900 text-base sm:text-lg mt-5 mb-2',
  ul: 'list-disc pl-6 mb-4 space-y-2 text-gray-600 text-sm sm:text-base leading-relaxed [&_ul]:list-[circle] [&_ul]:mt-2 [&_ul]:mb-0 [&_ol]:mt-2 [&_ol]:mb-0',
  ol: 'list-decimal pl-6 mb-4 space-y-2 text-gray-600 text-sm sm:text-base leading-relaxed [&_ul]:mt-2 [&_ul]:mb-0 [&_ol]:mt-2 [&_ol]:mb-0',
  table: 'w-full min-w-[32rem] border-collapse text-sm text-gray-600',
};
