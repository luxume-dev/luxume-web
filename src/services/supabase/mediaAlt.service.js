import { supabase } from '@/lib/supabase';

/**
 * Media Alt Service
 * Alt text set per file in the dashboard's Media Library (media_alt table,
 * public / read-only). Rows are keyed by the file's public URL.
 */

/**
 * @returns {Promise<{data: Array<{url: string, alt_text: string}>, error: string|null}>}
 */
export async function getMediaAlts() {
    try {
        const { data, error } = await supabase.from('media_alt').select('url, alt_text');
        if (error) throw error;
        return { data: data ?? [], error: null };
    } catch (error) {
        // A missing table just means no alt text yet; images keep their fallback alt
        console.error('[Media Alt Service] Error fetching media alt text:', error);
        return { data: [], error: error.message };
    }
}
