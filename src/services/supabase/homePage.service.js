import { supabase } from '@/lib/supabase';

/**
 * Home Page Service
 * Reads the home page content managed in the dashboard (public / read-only).
 * Like getHomePageSeo, the first home_page row is the one the dashboard edits.
 */

/**
 * Fetch the home page content fields: the hero, plus the Smart Home intro and
 * progress (stats) section right below it, and the Core Values section.
 * @returns {Promise<{data: {hero_banner, hero_title, hero_button_label, hero_button_link,
 *   smart_home_title, smart_home_description, progress_label, progress_title, progress_image,
 *   core_value_title, core_value_description, core_value_card_title, core_value_card_description,
 *   core_value_icon}|null,
 *   error: string|null}>}
 */
export async function getHomeContent() {
    try {
        const { data, error } = await supabase
            .from('home_page')
            .select(
                'hero_banner, hero_title, hero_button_label, hero_button_link, ' +
                'smart_home_title, smart_home_description, progress_label, progress_title, progress_image, ' +
                'core_value_title, core_value_description, core_value_card_title, core_value_card_description, core_value_icon'
            )
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (error) throw error;

        return { data: data ?? null, error: null };
    } catch (error) {
        console.error('[Home Page Service] Error fetching home content:', error);
        return { data: null, error: error.message };
    }
}
