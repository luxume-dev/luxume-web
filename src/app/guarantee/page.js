import Link from 'next/link';
import Image from 'next/image';
import FaqSection from '@/components/FaqSection';
import AltTextProvider from '@/providers/AltTextProvider';
import { getAssurancePageContent } from '@/services/supabase';
import { getAssurancePageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, normaliseImageSrc, visibleFaqs } from '@/lib/pageSeo';
import { parseRichHtml } from '@/lib/parseHtml';

export const revalidate = 3600;

// Content and SEO are managed from the dashboard (assurance_page -> page_seo)
export async function generateMetadata() {
  const seo = buildSeoMetadata(await getAssurancePageSeoCached(), { path: '/guarantee' });
  return {
    ...seo,
    alternates: { canonical: '/guarantee' },
  };
}

// Section colour (hex, picked in the dashboard) and bullet style
const BULLETS = new Set(['check', 'dot', 'cross', 'definition']);

// "#abc" / "#aabbcc" -> "#AABBCC" (6 digits, so a tint can be appended); null if not a hex colour
function sectionColor(value) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(text(value));
  if (!m) return null;
  return '#' + (m[1].length === 3 ? m[1].replace(/./g, (c) => c + c) : m[1]).toUpperCase();
}

/* ─── Content helpers ───────────────────────────────────────────── */

const text = (value) => (typeof value === 'string' ? value.trim() : '');
const isRecord = (value) => value && typeof value === 'object' && !Array.isArray(value);

// Empty fields hide their part of the page
function pageContent(data) {
  const content = isRecord(data?.content) ? data.content : {};
  const cta = isRecord(content.cta) ? content.cta : {};
  const sections = Array.isArray(content.sections) ? content.sections : [];
  return {
    label: text(data?.label),
    title: text(data?.title),
    description: text(data?.description),
    image: text(data?.image),
    card_text: text(data?.card_text),
    sections: sections
      .filter(isRecord)
      .map((s) => ({
        title: text(s.title),
        description: text(s.description),
        accent: sectionColor(s.color),
        bullet: BULLETS.has(s.bullet) ? s.bullet : null,
      }))
      .filter((s) => s.title || s.description),
    cta: {
      title: text(cta.title),
      description: text(cta.description),
      button_label: text(cta.button_label),
      button_link: text(cta.button_link),
    },
  };
}

const isExternal = (href) => /^https?:\/\//i.test(href);

/* ─── Helper Components ─────────────────────────────────────────── */

function SectionCard({ title, accent, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-l-4" style={{ borderColor: accent, backgroundColor: '#f8f9fc' }}>
          <h2 className="font-aloevera font-bold text-lg md:text-xl" style={{ color: accent }}>{title}</h2>
        </div>
      )}
      {children && <div className="px-6 py-5">{children}</div>}
    </div>
  );
}

function BulletIcon({ bullet, color }) {
  if (bullet === 'check' || bullet === 'cross') {
    return (
      <svg className="w-3 h-3" fill="none" stroke={color ?? 'currentColor'} viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d={bullet === 'check' ? 'M5 13l4 4L19 7' : 'M6 18L18 6M6 6l12 12'}
        />
      </svg>
    );
  }
  return <div className="w-1.5 h-1.5 rounded-full bg-current" style={color ? { backgroundColor: color } : undefined} />;
}

// The section's rich text with the page's list styling: each list item gets a
// tinted badge (check / dot / cross), or for "definition" a dot with the bold
// term in darker text.
// No bullet style: the rich text is shown as written (plain lists).
function SectionBody({ html, bullet, accent }) {
  if (!bullet) {
    return <div className="font-lato text-gray-700 text-sm leading-relaxed [&>*:last-child]:mb-0">{parseRichHtml(html)}</div>;
  }
  const definition = bullet === 'definition';
  const components = {
    p: ({ key, style }, children) => (
      <p key={key} style={style} className="font-lato text-gray-600 text-sm leading-relaxed mb-4">
        {children}
      </p>
    ),
    ul: ({ key }, children) => (
      <ul key={key} className={definition ? 'space-y-4 mb-4' : 'space-y-0 mb-4'}>
        {children}
      </ul>
    ),
    li: ({ key, style }, children) =>
      definition ? (
        <li key={key} className="flex gap-3">
          <div className="flex-shrink-0 mt-1">
            <div className="w-2 h-2 rounded-full mt-1.5 bg-gray-400" style={accent ? { backgroundColor: accent } : undefined} />
          </div>
          <div style={style} className="font-lato text-gray-600 text-sm leading-relaxed">
            {children}
          </div>
        </li>
      ) : (
        <li key={key} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
          <span
            className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
            style={accent ? { backgroundColor: accent + '18' } : undefined}
          >
            <BulletIcon bullet={bullet} color={accent} />
          </span>
          <div style={style} className="font-lato text-gray-700 text-sm leading-relaxed">
            {children}
          </div>
        </li>
      ),
    strong: ({ key }, children) => (
      <strong key={key} className="font-lato font-bold text-gray-800">
        {children}
      </strong>
    ),
  };

  return <div className="[&>*:last-child]:mb-0">{parseRichHtml(html, { components })}</div>;
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default async function WarrantyPage() {
  // None of these throw: a failure renders the page without the content / SEO extras
  const [{ data }, seo] = await Promise.all([getAssurancePageContent(), getAssurancePageSeoCached()]);
  const page = pageContent(data);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);
  const alts = buildAltMap(seo);
  const imageAlt = page.image ? alts[normaliseImageSrc(page.image)] ?? '' : '';

  return (
    <AltTextProvider alts={alts}>
      <main className="bg-white min-h-screen">
        {seo?.schema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
        )}
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
        )}

        {/* Hero */}
        <section
          className="relative flex flex-col items-center justify-center text-center px-4 py-28 md:py-36 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a1b4b 0%, #2d2f6b 60%, #C83C64 100%)' }}
        >
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: '#C83C64' }} />
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: '#ffffff' }} />

          {page.label && (
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-lato font-semibold tracking-widest uppercase text-white/70 border border-white/20 mb-5">
              {page.label}
            </span>
          )}
          {page.title && (
            <h1 className="font-aloevera font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
              {page.title}
            </h1>
          )}
          {page.description && (
            <p className="font-lato text-white/70 max-w-xl text-base md:text-lg whitespace-pre-line">
              {page.description}
            </p>
          )}
        </section>

        {/* Guarantee Image */}
        {page.image && (
          <div className="w-full max-w-4xl mx-auto px-4 md:px-8 -mt-1 pt-12">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <Image
                src={page.image}
                alt={imageAlt}
                width={1200}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        <section className="py-12 md:py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Intro banner */}
            {page.card_text && (
              <div className="rounded-2xl p-6 md:p-8 text-center" style={{ backgroundColor: '#1a1b4b' }}>
                <p className="font-lato text-white/80 text-sm md:text-base leading-relaxed max-w-3xl mx-auto whitespace-pre-line">
                  {page.card_text}
                </p>
              </div>
            )}

            {/* Sections (title + rich-text description from the dashboard) */}
            {page.sections.map((section, i) => (
              <SectionCard key={i} title={section.title} accent={section.accent}>
                {section.description && (
                  <SectionBody html={section.description} bullet={section.bullet} accent={section.accent} />
                )}
              </SectionCard>
            ))}

            {/* Bottom CTA */}
            {page.cta.title && (
              <div
                className="rounded-2xl px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
                style={{ background: 'linear-gradient(135deg, #1a1b4b, #2d2f6b)' }}
              >
                <div>
                  <p className="font-aloevera font-bold text-xl text-white mb-1">{page.cta.title}</p>
                  {page.cta.description && (
                    <p className="font-lato text-white/60 text-sm">{page.cta.description}</p>
                  )}
                </div>
                {page.cta.button_label && page.cta.button_link && (
                  <Link
                    href={page.cta.button_link}
                    {...(isExternal(page.cta.button_link) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex-shrink-0 inline-block px-8 py-3 rounded-xl font-lato font-semibold text-sm text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#C83C64' }}
                  >
                    {page.cta.button_label}
                  </Link>
                )}
              </div>
            )}

          </div>
        </section>

        <FaqSection faqs={faqs} />
      </main>
    </AltTextProvider>
  );
}
