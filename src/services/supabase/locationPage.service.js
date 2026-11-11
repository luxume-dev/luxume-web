import { supabase } from '@/lib/supabase';

/**
 * Location Page Service
 * Reads the /locations page heading managed in the dashboard (public / read-only).
 * The first location_page row is the one the dashboard edits.
 *
 * banner_img: image URL; label, title, description, supply_title, supply_description: text
 * (empty -> the page uses its default)
 *
 * @returns {Promise<{data: {banner_img, label, title, description, supply_title, supply_description}|null, error: string|null}>}
 */
export async function getLocationPageContent() {
  try {
    const { data, error } = await supabase
      .from('location_page')
      .select('banner_img, label, title, description, supply_title, supply_description')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error('[Location Page Service] Error fetching location page content:', error);
    return { data: null, error: error.message };
  }
}
