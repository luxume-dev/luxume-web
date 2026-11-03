import { supabase } from '@/lib/supabase';

/**
 * About Page Service
 * Reads the About page content managed in the dashboard (public / read-only).
 * Like getAboutPageSeo, the first about_page row is the one the dashboard edits.
 *
 * Repeatable fields (card_*, core_card_*, work_point_*) are text columns
 * holding JSON string arrays that line up by index.
 */

/**
 * @returns {Promise<{data: {banner_image, card_title, card_description,
 *   about_us_title, about_us_description, about_us_image,
 *   core_value_title, core_value_description, core_card_title, core_card_description, core_card_icon,
 *   work_title, work_description, work_image, work_point_title, work_point_description,
 *   work_buttom_text}|null, error: string|null}>}
 */
export async function getAboutContent() {
    try {
        const { data, error } = await supabase
            .from('about_page')
            .select(
                'banner_image, card_title, card_description, ' +
                'about_us_title, about_us_description, about_us_image, ' +
                'core_value_title, core_value_description, core_card_title, core_card_description, core_card_icon, ' +
                'work_title, work_description, work_image, work_point_title, work_point_description, work_buttom_text'
            )
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (error) throw error;

        return { data: data ?? null, error: null };
    } catch (error) {
        console.error('[About Page Service] Error fetching about content:', error);
        return { data: null, error: error.message };
    }
}
