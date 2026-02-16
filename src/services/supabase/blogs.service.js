import { supabase } from '@/lib/supabase';

/**
 * Blogs Service
 * Handles all blog-related Supabase operations (public / read-only)
 */

/**
 * Fetch all published blogs with their category
 * @returns {Promise<{data: Array|null, error: string|null}>}
 */
export async function getPublishedBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*, category:categories(*)')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('[Blogs Service] Error fetching published blogs:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Fetch a single published blog by slug
 * @param {string} slug - The blog slug
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function getBlogBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*, category:categories(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .limit(1)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('[Blogs Service] Error fetching blog by slug:', error);
    return { data: null, error: error.message };
  }
}
