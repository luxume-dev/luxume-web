import { supabase } from '@/lib/supabase';

/**
 * Assurance Page Service
 * Reads the Guarantee page managed in the dashboard (public / read-only).
 * The first assurance_page row is the one the dashboard edits.
 *
 * label, title, description, image, card_text: text
 * content (jsonb): { sections: [{ title, description (HTML from the rich-text editor),
 *                                 color: hex like #C83C64 or null, bullet: check/dot/cross/definition or null }],
 *                    cta: { title, description, button_label, button_link } }
 *
 * @returns {Promise<{data: {label, title, description, image, card_text, content}|null, error: string|null}>}
 */
export async function getAssurancePageContent() {
  try {
    const { data, error } = await supabase
      .from('assurance_page')
      .select('label, title, description, image, card_text, content')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error('[Assurance Page Service] Error fetching assurance page content:', error);
    return { data: null, error: error.message };
  }
}
