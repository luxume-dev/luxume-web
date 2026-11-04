import { supabase } from '@/lib/supabase';

/**
 * Guideline Page Service
 * Reads the Do's & Don'ts page managed in the dashboard (public / read-only).
 * The first guideline_page row is the one the dashboard edits.
 *
 * label, title, description, card_text: text
 * content (jsonb): { dos: [string], donts: [string],
 *                    cta: { title, description, button_label } }
 *
 * @returns {Promise<{data: {label, title, description, card_text, content}|null, error: string|null}>}
 */
export async function getGuidelinePageContent() {
  try {
    const { data, error } = await supabase
      .from('guideline_page')
      .select('label, title, description, card_text, content')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error('[Guideline Page Service] Error fetching guideline page content:', error);
    return { data: null, error: error.message };
  }
}
