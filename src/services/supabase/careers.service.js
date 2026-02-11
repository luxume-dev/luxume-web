import { supabase } from '@/lib/supabase';

/**
 * Careers Service
 * Handles all careers-related Supabase operations
 */

/**
 * Fetch all active career openings
 * @returns {Promise<{data: Array|null, error: string|null}>}
 */
export async function getActiveCareers() {
  try {
    const { data, error } = await supabase
      .from('careers')
      .select('id, title, department, location, tags')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('[Careers Service] Error fetching careers:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Fetch a single career by ID
 * @param {string} id - The career ID
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function getCareerById(id) {
  try {
    const { data, error } = await supabase
      .from('careers')
      .select('id, title, department, employment_type, location, experience, responsibilities, gender, age, skills, salary')
      .eq('id', id)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('[Careers Service] Error fetching career:', error);
    return { data: null, error: error.message };
  }
}
