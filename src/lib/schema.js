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
