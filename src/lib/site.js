/**
 * Canonical origin for the deployed site.
 *
 * Used by metadataBase, the sitemap and robots routes. Override per
 * environment with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.luxume.in'
).replace(/\/$/, '');
