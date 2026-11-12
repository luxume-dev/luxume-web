/**
 * Media uploaded from the dashboard lives in the Supabase "blog-images" bucket,
 * whose public URLs look like
 *   https://<project>.supabase.co/storage/v1/object/public/blog-images/blogs/blog-page/a.jpg
 *
 * The site serves the same files from its own domain instead:
 *   https://www.luxume.in/blogs/blog-page/a.jpg
 *
 * next.config.mjs proxies those paths back to the bucket (an afterFiles rewrite
 * on media file extensions, so files in /public and the app's page routes win).
 */
export const STORAGE_BUCKET = 'blog-images';

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
const STORAGE_PREFIX = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/`;

/** Rewrite every bucket URL inside a string (a plain URL, or HTML / JSON text) to a site path. */
export function toSitePaths(text) {
  if (typeof text !== 'string' || !SUPABASE_URL || !text.includes(STORAGE_PREFIX)) return text;
  return text.split(STORAGE_PREFIX).join('/');
}
