import { supabase } from '@/lib/supabase';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Resolve whether a record is definitively absent.
 *
 * maybeSingle() gives a clean three-way answer: a row, no row, or an error.
 * A lookup failure deliberately returns false — a transient Supabase problem
 * must never turn a page that genuinely exists into a 404, which search
 * engines would then drop from the index. Only a confirmed empty result does.
 */
async function isMissing(query) {
  const { data, error } = await query.maybeSingle();
  if (error) return false;
  return !data;
}

export const brandMissing = (slug) =>
  !slug ? Promise.resolve(true) : isMissing(supabase.from('brands').select('slug').eq('slug', slug));

export const postMissing = (slug) =>
  !slug
    ? Promise.resolve(true)
    : isMissing(
        supabase.from('blogs').select('slug').eq('slug', slug).eq('status', 'published')
      );

/**
 * Career ids are UUIDs. A malformed id makes Postgres raise a type error
 * rather than return an empty set, so reject the shape up front — otherwise
 * that error would be read as "lookup failed" and served as a 200.
 */
export const jobMissing = (id) =>
  !id || !UUID.test(id)
    ? Promise.resolve(true)
    : isMissing(supabase.from('careers').select('id').eq('id', id));
