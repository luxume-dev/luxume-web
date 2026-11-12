import { SITE_URL } from '@/lib/site';
import { socialHref } from '@/lib/siteSettings';

/** Footer social platforms that are profiles on another site (not phone / WhatsApp / email). */
const PROFILE_PLATFORMS = new Set(['instagram', 'facebook', 'youtube', 'linkedin', 'x', 'pinterest']);

const clean = (v) => (typeof v === 'string' ? v.trim() : '');

/**
 * Sitewide Organization structured data.
 *
 * Address, phone, email and social profiles come from the footer settings
 * (dashboard → Settings → General Settings → Footer), the same values the
 * footer shows, so visible contact details and schema can't drift apart.
 * A field left empty there is left out here rather than filled with a guess.
 *
 * Typed as Organization rather than LocalBusiness on purpose: Luxume
 * manufactures and sells nationally through dealers, it is not a storefront
 * customers visit for local-pack intent.
 *
 * @param {object} footer  resolveSiteSettings(row).footer
 */
export function organizationSchema(footer = {}) {
  const contact = footer.contact || {};
  // The dashboard address is one free-text field (often multi-line), so it
  // can't be split reliably into locality/region/postcode.
  const address = clean(contact.address).split(/\s*\n+\s*/).filter(Boolean).join(', ');
  const phone = clean(contact.phone);
  const email = clean(contact.email);

  const sameAs = [
    ...new Set(
      (Array.isArray(footer.socials) ? footer.socials : [])
        .filter((s) => PROFILE_PLATFORMS.has(s?.platform))
        .map((s) => socialHref(s.platform, s.url))
        .filter((href) => /^https?:\/\//i.test(href))
    ),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Luxume Roofing',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-2.png`,
    foundingDate: '2011',
    description:
      'Luxume is a leading manufacturer of colour-coated steel sheets primarily supplied to the construction industry.',
    ...(address
      ? { address: { '@type': 'PostalAddress', streetAddress: address, addressCountry: 'IN' } }
      : {}),
    ...(phone || email
      ? {
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              ...(phone ? { telephone: phone } : {}),
              ...(email ? { email } : {}),
              areaServed: 'IN',
              availableLanguage: ['en'],
            },
          ],
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Luxume Roofing',
  publisher: { '@id': `${SITE_URL}/#organization` },
};

const ORG_REF = { '@id': `${SITE_URL}/#organization` };

/**
 * Product schema for a brand detail page.
 *
 * Deliberately omits offers/aggregateRating/review: the brands table holds no
 * price, and no review data source exists — this is a quote/lead flow, not
 * checkout. Inventing either would breach Google's structured-data policy.
 */
export function productSchema(brand) {
  if (!brand?.title || !brand?.slug) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: brand.title,
    ...(brand.cover_image_url ? { image: brand.cover_image_url } : {}),
    ...(brand.description ? { description: brand.description } : {}),
    brand: { '@type': 'Brand', name: 'Luxume' },
    manufacturer: ORG_REF,
    category: 'Colour-Coated Steel Roofing Sheets',
    url: `${SITE_URL}/products/${brand.slug}`,
  };
}

const absoluteUrl = (url) => (url && url.startsWith('/') ? `${SITE_URL}${url}` : url);

// blogs.updated_at / created_at have no time zone; the dashboard writes them in UTC.
// Plain dates (published_on, YYYY-MM-DD) are left as they are.
const withZone = (value) =>
  typeof value === 'string' && /T\d{2}:\d{2}/.test(value) && !/(Z|[+-]\d{2}:?\d{2})$/.test(value)
    ? `${value}Z`
    : value;

/**
 * Article schema for a blog post.
 *
 * @param {object} post         the blog row, with `author` joined from the authors table
 * @param {string} slug
 * @param {object} [options]
 * @param {string} [options.headline]     page title (page_seo meta title, else the post title)
 * @param {string} [options.description]  the page's meta description
 * @param {string} [options.image]        featured image, absolute or site-relative
 *
 * The author is the post's author (Authors in the dashboard) as a Person; a
 * post without one is attributed to the organisation rather than a made-up name.
 */
export function articleSchema(post, slug, { headline, description, image } = {}) {
  if (!post?.title) return null;

  const url = `${SITE_URL}/blog/${slug}`;
  const authorName = clean(post.author?.author_name);
  const imageUrl = absoluteUrl(clean(image) || post.image_url);
  const datePublished = withZone(post.published_on || post.created_at);
  const dateModified = withZone(post.updated_at) || datePublished;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: clean(headline) || post.meta_title || post.title,
    ...(clean(description) ? { description: clean(description) } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    author: authorName
      ? { '@type': 'Person', name: authorName }
      : { '@type': 'Organization', name: 'Luxume Roofing', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Luxume Roofing',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo-2.png`,
      },
    },
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
  };
}

/**
 * BreadcrumbList from [{ name, path }] in trail order.
 */
export function breadcrumbSchema(trail) {
  if (!Array.isArray(trail) || trail.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(({ name, path }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}
