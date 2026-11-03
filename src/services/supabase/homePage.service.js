import { supabase } from '@/lib/supabase';

/**
 * Home Page Service
 * Reads the home page content managed in the dashboard (public / read-only).
 * Like getHomePageSeo, the first home_page row is the one the dashboard edits.
 */

/**
 * Fetch the home page content fields: the hero, plus the Smart Home intro and
 * progress (stats) section right below it, the Core Values section and the
 * Coated Steel Layers section, the Featured Projects heading, the video and
 * the Product Highlights section.
 * @returns {Promise<{data: {hero_banner, hero_title, hero_button_label, hero_button_link,
 *   smart_home_title, smart_home_description, progress_label, progress_title, progress_image,
 *   core_value_title, core_value_description, core_value_card_title, core_value_card_description,
 *   core_value_icon, coated_steel_label, coated_steel_title, coated_steel_description,
 *   coated_steel_images, coated_steel_img_label, project_label, project_title, project_description,
 *   home_video, hlghlight_title, hlghlight_description, hlghlight_card_title, hlghlight_card_description,
 *   hlghlight_card_icon}|null,
 *   error: string|null}>}
 */
export async function getHomeContent() {
    try {
        const { data, error } = await supabase
            .from('home_page')
            .select(
                'hero_banner, hero_title, hero_button_label, hero_button_link, ' +
                'smart_home_title, smart_home_description, progress_label, progress_title, progress_image, ' +
                'core_value_title, core_value_description, core_value_card_title, core_value_card_description, core_value_icon, ' +
                'coated_steel_label, coated_steel_title, coated_steel_description, coated_steel_images, coated_steel_img_label, ' +
                'project_label, project_title, project_description, ' +
                'home_video, ' +
                'hlghlight_title, hlghlight_description, hlghlight_card_title, hlghlight_card_description, hlghlight_card_icon'
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
