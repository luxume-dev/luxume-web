import { supabase } from '@/lib/supabase';

/**
 * Testimonials Service
 * Handles all testimonial-related Supabase operations (public / read-only)
 */

/**
 * Fetch the active testimonials picked for the home page in the dashboard
 * (is_home_featured), in the order set there: sort_order (1..n, counted
 * separately for video and text), then newest first
 * @returns {Promise<{data: Array|null, error: string|null}>}
 */
export async function getTestimonials() {
    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('id, type, name, location, quote, rating, video_url, profile_url, sort_order')
            .eq('is_active', true)
            .eq('is_home_featured', true)
            .order('sort_order', { ascending: true })
            .order('created_at', { ascending: false });

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error('[Testimonials Service] Error fetching testimonials:', error);
        return { data: null, error: error.message };
    }
}
