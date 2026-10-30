/**
 * Canonical origin for the deployed site.
 *
 * Used by metadataBase, the sitemap and robots routes. Override per
 * environment with NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.luxume.in'
).replace(/\/$/, '');

/**
 * Sitewide share image. Lives in /public rather than as app/opengraph-image.png
 * because a file-based OG image overrides every page's metadata images, which
 * would hide the per-page images set from the dashboard, blogs and products.
 */
export const DEFAULT_OG_IMAGE = '/images/og-default.png';
