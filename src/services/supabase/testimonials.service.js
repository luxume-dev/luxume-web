import { supabase } from '@/lib/supabase';

/**
 * Testimonials Service
 * Handles all testimonial-related Supabase operations (public / read-only)
 */

/**
 * Fetch all active testimonials ordered by sort_order
 * @returns {Promise<{data: Array|null, error: string|null}>}
 */
export async function getTestimonials() {
    try {
        const { data, error } = await supabase
            .from('testimonials')
            .select('id, type, name, location, quote, rating, video_url, profile_url, sort_order')
            .eq('is_active', true)
            .order('sort_order', { ascending: true });

        if (error) throw error;

        return { data, error: null };
    } catch (error) {
        console.error('[Testimonials Service] Error fetching testimonials:', error);
        return { data: null, error: error.message };
    }
}
