import { SITE_URL } from '@/lib/site';

/**
 * Sitewide structured data. Values here are the single source of truth for the
 * business NAP and must stay in sync with src/components/Footer.js — a mismatch
 * between visible contact details and schema is itself an SEO problem.
 *
 * Typed as Organization rather than LocalBusiness on purpose: Luxume
 * manufactures and sells nationally through dealers, it is not a storefront
 * customers visit for local-pack intent.
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Luxume Roofing',
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-2.png`,
  foundingDate: '2011',
  description:
    'Luxume, headquartered at Chittoor Road, Ernakulam, is a leading manufacturer of colour-coated steel sheets primarily supplied to the construction industry.',
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      '62/2592, 2nd Floor, Saj Mahal Building, Madakappillil Lane, Near Govt. HSS for Girls, Chittoor Road',
    addressLocality: 'Ernakulam',
    addressRegion: 'Kerala',
    postalCode: '682016',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-97785-57752',
      contactType: 'customer service',
      email: 'info@luxume.in',
      areaServed: 'IN',
      availableLanguage: ['en'],
    },
  ],
  sameAs: [
    'https://www.instagram.com/luxume_roofing/',
    'https://www.facebook.com/profile.php?id=100069323057371',
    'https://www.youtube.com/@Luxume-i1d',
  ],
};

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
    ...(post.created_at ? { datePublished: post.created_at } : {}),
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
