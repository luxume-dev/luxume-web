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

/**
 * BlogPosting for an article.
 *
 * Author is the organisation: no post carries a byline, and attributing one to
 * a named person we cannot verify would be worse than organisational
 * authorship. Add real authors when bylines exist.
 */
export function blogPostingSchema(post, slug) {
  if (!post?.title) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta_title || post.title,
    ...(post.image_url ? { image: post.image_url } : {}),
    ...((post.published_on || post.created_at)
      ? { datePublished: post.published_on || post.created_at }
      : {}),
    ...(post.updated_at ? { dateModified: post.updated_at } : {}),
    author: ORG_REF,
    publisher: ORG_REF,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
    url: `${SITE_URL}/blog/${slug}`,
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
