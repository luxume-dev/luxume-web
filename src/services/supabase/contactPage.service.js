import { supabase } from '@/lib/supabase';

/**
 * Contact Page Service
 * Reads the Contact page managed in the dashboard (public / read-only).
 * The first contact_page row is the one the dashboard edits.
 *
 * info (jsonb):        [{ type, label, title }]  type: address | phone | whatsapp | email | location | hours | text
 * form_fields (jsonb): { heading, submit_label, note, fields: { full_name: { label, placeholder }, ... } }
 *
 * @returns {Promise<{data: {title, description, info, form_fields}|null, error: string|null}>}
 */
export async function getContactPageContent() {
  try {
    const { data, error } = await supabase
      .from('contact_page')
      .select('title, description, info, form_fields')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error('[Contact Page Service] Error fetching contact page content:', error);
    return { data: null, error: error.message };
  }
}
