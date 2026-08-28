import { supabase } from '@/lib/supabase';
import { SITE_URL } from '@/lib/site';

// Revalidate the sitemap hourly so newly published brands/blogs/jobs get picked
// up without a redeploy.
export const revalidate = 3600;

const STATIC_ROUTES = [
  { path: '', changeFrequency: 'weekly', priority: 1.0 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/projects', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.7 },
  { path: '/guarantee', changeFrequency: 'yearly', priority: 0.7 },
  { path: '/dos-and-donts', changeFrequency: 'yearly', priority: 0.6 },
  { path: '/careers', changeFrequency: 'weekly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/terms-conditions', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.2 },
];

/**
 * Fetch dynamic routes from Supabase. Each source is resolved independently so
 * one failing table degrades that section only — the sitemap still ships with
 * every static route plus whatever else resolved.
 */
async function getDynamicEntries() {
  const [brands, blogs, careers] = await Promise.allSettled([
    supabase.from('brands').select('slug, created_at'),
    supabase.from('blogs').select('slug, created_at').eq('status', 'published'),
    supabase.from('careers').select('id, created_at').eq('is_active', true),
  ]);

  const rowsOf = (result) =>
    result.status === 'fulfilled' && !result.value.error ? result.value.data ?? [] : [];

  return [
    ...rowsOf(brands)
      .filter((row) => row.slug)
      .map((row) => ({
        url: `${SITE_URL}/products/${row.slug}`,
        lastModified: row.created_at ? new Date(row.created_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })),
    ...rowsOf(blogs)
      .filter((row) => row.slug)
      .map((row) => ({
        url: `${SITE_URL}/blog/${row.slug}`,
        lastModified: row.created_at ? new Date(row.created_at) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })),
    ...rowsOf(careers)
      .filter((row) => row.id)
      .map((row) => ({
        url: `${SITE_URL}/careers/${row.id}`,
        lastModified: row.created_at ? new Date(row.created_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.4,
      })),
  ];
}

export default async function sitemap() {
  const now = new Date();

  const staticEntries = STATIC_ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  return [...staticEntries, ...(await getDynamicEntries())];
}
