import { supabase } from '@/lib/supabase';

/**
 * General Settings Service
 * Reads the site-wide header and footer managed in the dashboard
 * (Settings → General Settings). The first "general-settings" row is the one used.
 *
 * header, footer, footer_bottom are jsonb; see src/lib/siteSettings.js for their shape.
 *
 * @returns {Promise<{data: {header, footer, footer_bottom}|null, error: string|null}>}
 */
export async function getGeneralSettings() {
  try {
    const { data, error } = await supabase
      .from('general-settings')
      .select('header, footer, footer_bottom')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error('[General Settings Service] Error fetching general settings:', error);
    return { data: null, error: error.message };
  }
}
