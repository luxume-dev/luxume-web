import { supabase } from '@/lib/supabase';

/**
 * Blogs Service
 * Handles all blog-related Supabase operations (public / read-only)
 */

/**
 * Fetch all published blogs with their category and author
 * @returns {Promise<{data: Array|null, error: string|null}>}
 */
export async function getPublishedBlogs() {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*, category:categories(*), author:authors(id, author_name, author_image)')
      .eq('status', 'published')
      // sort_date = published_on, else created_at (set by a DB trigger)
      .order('sort_date', { ascending: false })
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
      .select('*, category:categories(*), author:authors(id, author_name, author_image)')
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
