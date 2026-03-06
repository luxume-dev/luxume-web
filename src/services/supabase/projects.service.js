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
