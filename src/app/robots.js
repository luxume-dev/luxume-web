// The site is set to noindex (meta robots in layout.js + X-Robots-Tag header in
// next.config.mjs). Crawling stays allowed on purpose: a robots.txt Disallow
// would stop crawlers from ever seeing the noindex directive, and blocked URLs
// can still be indexed from external links.
export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
  };
}
