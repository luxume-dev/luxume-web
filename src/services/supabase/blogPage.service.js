import { supabase } from '@/lib/supabase';

/**
 * Blog Page Service
 * Reads the Blog page hero managed in the dashboard (public / read-only).
 * The first blog_page row is the one the dashboard edits.
 *
 * @returns {Promise<{data: {title, description, banner_image}|null, error: string|null}>}
 */
export async function getBlogPageContent() {
  try {
    const { data, error } = await supabase
      .from('blog_page')
      .select('title, description, banner_image')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error('[Blog Page Service] Error fetching blog page content:', error);
    return { data: null, error: error.message };
  }
}
