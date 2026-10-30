import { DEFAULT_OG_IMAGE, SITE_URL } from '@/lib/site';

/**
 * Helpers that turn a dashboard-managed page_seo record (with page_faqs and
 * alt_image) into Next metadata, JSON-LD and an alt text lookup.
 *
 * Every helper tolerates a missing record so a page keeps its static defaults
 * when the CMS row is absent or Supabase is unreachable.
 */

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * Next metadata from page_seo. Only fields that are filled in are returned, so
 * anything left empty falls back to the layout's defaults.
 */
export function buildSeoMetadata(seo, { path = '/' } = {}) {
  if (!seo) return {};

  const title = clean(seo.meta_title);
  const description = clean(seo.meta_description);
  const keywords = clean(seo.meta_keywords)
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);

  const ogTitle = clean(seo.og_title) || title;
  const ogDescription = clean(seo.og_description) || description;
  const ogImage = clean(seo.og_image) || DEFAULT_OG_IMAGE;

  return {
    // absolute: the CMS title is the full title, so skip the "| Luxume Roofing" template
    ...(title ? { title: { absolute: title } } : {}),
    ...(description ? { description } : {}),
    ...(keywords.length ? { keywords } : {}),
    openGraph: {
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
      type: 'website',
      url: clean(seo.og_url) || path,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
      images: [ogImage],
    },
  };
}

/** FAQs that have both a question and an answer. */
export function visibleFaqs(seo) {
  return (seo?.page_faqs ?? []).filter((faq) => clean(faq.questions) && clean(faq.answers));
}

/** FAQPage JSON-LD for the FAQs shown on the page, or null when there are none. */
export function faqPageSchema(faqs) {
  if (!faqs.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: clean(faq.questions),
      acceptedAnswer: { '@type': 'Answer', text: clean(faq.answers) },
    })),
  };
}

/**
 * Normalise an image src so "/images/a.webp" and "https://www.luxume.in/images/a.webp"
 * match the same alt_image row. Off-site URLs (e.g. Supabase storage) stay absolute.
 */
export function normaliseImageSrc(src) {
  const value = clean(src);
  if (!value) return '';
  try {
    const url = new URL(value, SITE_URL);
    return url.origin === new URL(SITE_URL).origin ? url.pathname : url.href;
  } catch {
    return value;
  }
}

/** { normalisedSrc: alt } from alt_image rows, for AltTextProvider. */
export function buildAltMap(seo) {
  const map = {};
  for (const row of seo?.alt_image ?? []) {
    const src = normaliseImageSrc(row.source);
    const alt = clean(row.image_alt);
    if (src && alt) map[src] = alt;
  }
  return map;
}

/**
 * Serialise JSON-LD for a <script> tag. Escapes "<" so CMS-entered text can
 * never close the script element early.
 */
export function jsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
