import { createClient } from '@supabase/supabase-js';
import { toSitePaths } from '@/lib/storageUrl';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Every database response passes through here, so storage URLs saved by the
 * dashboard (image columns, rich-text HTML, SEO fields) reach the site as
 * www.luxume.in/<folder>/<file> paths rather than supabase.co links.
 */
async function siteMediaFetch(input, init) {
  const response = await fetch(input, init);
  const url = typeof input === 'string' ? input : input?.url ?? String(input);
  const type = response.headers.get('content-type') ?? '';
  if (!url.includes('/rest/v1/') || !type.includes('json')) return response;

  const text = await response.text();
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.delete('content-encoding');
  return new Response(toSitePaths(text), {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: { fetch: siteMediaFetch },
});
