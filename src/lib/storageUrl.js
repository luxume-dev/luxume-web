/**
 * Media uploaded from the dashboard lives in the Supabase "blog-images" bucket,
 * whose public URLs look like
 *   https://<project>.supabase.co/storage/v1/object/public/blog-images/blogs/blog-page/a.jpg
 *
 * The site serves the same files from its own domain instead:
 *   https://www.luxume.in/blog/a.jpg            (bucket folder blogs/blog-page/)
 *   https://www.luxume.in/home-page/hero/b.jpg  (every other folder, path kept as-is)
 *
 * next.config.mjs proxies those paths back to the bucket (afterFiles rewrites
 * on media file extensions, so files in /public and the app's page routes win).
 */
export const STORAGE_BUCKET = 'blog-images';

/** Bucket folders served under a shorter site path. Keep in sync with next.config.mjs. */
export const FOLDER_ALIASES = [{ bucket: 'blogs/blog-page/', site: 'blog/' }];

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').replace(/\/$/, '');
const STORAGE_PREFIX = `${SUPABASE_URL}/storage/v1/object/public/${STORAGE_BUCKET}/`;

/** Rewrite every bucket URL inside a string (a plain URL, or HTML / JSON text) to a site path. */
export function toSitePaths(text) {
  if (typeof text !== 'string' || !SUPABASE_URL || !text.includes(STORAGE_PREFIX)) return text;
  let out = text;
  for (const { bucket, site } of FOLDER_ALIASES) {
    out = out.split(STORAGE_PREFIX + bucket).join(`/${site}`);
  }
  return out.split(STORAGE_PREFIX).join('/');
}
