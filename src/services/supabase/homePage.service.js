import { supabase } from '@/lib/supabase';

/**
 * Home Page Service
 * Reads the home page hero managed in the dashboard (public / read-only).
 * Like getHomePageSeo, the first home_page row is the one the dashboard edits.
 */

/**
 * Fetch the home page hero fields.
 * @returns {Promise<{data: {hero_banner, hero_title, hero_button_label, hero_button_link}|null, error: string|null}>}
 */
export async function getHomeHero() {
    try {
        const { data, error } = await supabase
            .from('home_page')
            .select('hero_banner, hero_title, hero_button_label, hero_button_link')
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (error) throw error;

        return { data: data ?? null, error: null };
    } catch (error) {
        console.error('[Home Page Service] Error fetching home hero:', error);
        return { data: null, error: error.message };
    }
}
