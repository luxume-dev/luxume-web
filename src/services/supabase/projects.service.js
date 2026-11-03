import { supabase } from '@/lib/supabase';

/**
 * Fetch all active projects
 * @returns {Promise<{data: Array|null, error: string|null}>}
 */
export async function getActiveProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('[Projects Service] Error fetching active projects:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Fetch the active projects marked "Show on Home Page" in the dashboard
 * (projects.is_home_featured = true)
 * @returns {Promise<{data: Array|null, error: string|null}>}
 */
export async function getHomeFeaturedProjects() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_active', true)
      .eq('is_home_featured', true)
      // Order set in the dashboard's Home Page editor; unset positions go last
      .order('home_order', { ascending: true, nullsFirst: false })
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('[Projects Service] Error fetching home featured projects:', error);
    return { data: null, error: error.message };
  }
}
