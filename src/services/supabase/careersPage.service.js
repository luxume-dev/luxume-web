import { supabase } from '@/lib/supabase';

/**
 * Careers Page Service
 * Reads the Careers page hero managed in the dashboard (public / read-only).
 * The first careers_page row is the one the dashboard edits.
 *
 * @returns {Promise<{data: {title, description, banner_image, banner_button_label, openings_title, openings_description, apply_title, apply_description, apply_email, apply_whatsapp}|null, error: string|null}>}
 */
export async function getCareersPageContent() {
  try {
    const { data, error } = await supabase
      .from('careers_page')
      .select('title, description, banner_image, banner_button_label, openings_title, openings_description, apply_title, apply_description, apply_email, apply_whatsapp')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error('[Careers Page Service] Error fetching careers page content:', error);
    return { data: null, error: error.message };
  }
}
