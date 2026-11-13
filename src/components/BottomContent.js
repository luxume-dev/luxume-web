import { parseRichHtml } from '@/lib/parseHtml';

/**
 * A page's Bottom Content: rich-text HTML written in the dashboard's editor
 * (page_seo.bottom_content, SEO tab). Rendered safely through parseRichHtml with
 * the site's long-form typography. Renders nothing when the content is empty.
 */

// Long-form typography for every tag the editor can produce
const CLASSES = {
  h2: "relative font-aloevera text-3xl md:text-4xl font-bold text-[#1a1b4b] leading-tight mt-14 mb-6 pb-4 after:absolute after:left-0 after:bottom-0 after:h-1 after:w-16 after:rounded-full after:bg-[#C83C64] after:content-['']",
  h3: 'font-aloevera text-xl md:text-2xl font-bold text-[#C83C64] leading-snug mt-10 mb-3',
  h4: 'font-aloevera text-lg md:text-xl font-bold text-[#1a1b4b] mt-8 mb-2',
  p: 'font-lato text-gray-600 text-base md:text-lg leading-relaxed mb-5',
  ul: "font-lato text-gray-600 text-base md:text-lg leading-relaxed mb-6 space-y-3 [&>li]:relative [&>li]:pl-7 [&>li]:before:absolute [&>li]:before:left-1 [&>li]:before:top-[0.65em] [&>li]:before:h-2 [&>li]:before:w-2 [&>li]:before:rounded-full [&>li]:before:bg-[#C83C64] [&>li]:before:content-[''] [&_ul]:mt-3 [&_ul]:mb-0 [&_ol]:mt-3 [&_ol]:mb-0",
  ol: 'list-decimal pl-6 font-lato text-gray-600 text-base md:text-lg leading-relaxed mb-6 space-y-3 marker:font-bold marker:text-[#C83C64] [&>li]:pl-2 [&_ul]:mt-3 [&_ul]:mb-0 [&_ol]:mt-3 [&_ol]:mb-0',
  li: '',
  a: 'font-semibold text-[#C83C64] underline decoration-2 decoration-[#C83C64]/30 underline-offset-4 transition-colors hover:decoration-[#C83C64]',
  blockquote:
    'my-8 rounded-r-2xl border-l-4 border-[#C83C64] bg-pink-50/70 px-6 py-5 font-lato text-lg md:text-xl italic leading-relaxed text-[#1a1b4b] [&>p]:mb-0 [&>p]:text-inherit',
  hr: 'my-12 border-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent',
  strong: 'font-bold text-[#1a1b4b]',
  s: 'line-through',
  table: 'w-full min-w-[32rem] border-collapse font-lato text-sm sm:text-base',
  img: 'inline-block max-w-full h-auto rounded-2xl my-6 align-middle shadow-sm',
  thead: 'bg-[#1a1b4b] text-white',
  tbody: '',
  tr: 'border-b border-gray-100 last:border-b-0 even:bg-gray-50',
  th: 'px-5 py-3 text-left align-top font-semibold',
  td: 'px-5 py-3 text-left align-top text-gray-600',
};

export default function BottomContent({ html, className = '' }) {
  if (typeof html !== 'string' || !html.trim()) return null;
  const content = parseRichHtml(html, { classes: CLASSES });
  if (!content) return null;

  return (
    <section className={`py-16 md:py-20 px-4 md:px-8 bg-white ${className}`}>
      <article className="max-w-5xl mx-auto [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_table]:rounded-2xl">
        {content}
      </article>
    </section>
  );
}
