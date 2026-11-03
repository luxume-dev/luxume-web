import { supabase } from '@/lib/supabase';

/**
 * Projects Page Service
 * Reads the Projects page heading managed in the dashboard (public / read-only).
 * The first project_page row is the one the dashboard edits.
 *
 * @returns {Promise<{data: {label, title, description}|null, error: string|null}>}
 */
export async function getProjectPageContent() {
  try {
    const { data, error } = await supabase
      .from('project_page')
      .select('label, title, description')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error('[Project Page Service] Error fetching projects page content:', error);
    return { data: null, error: error.message };
  }
}
