import { supabase } from '@/lib/supabase';

/**
 * Page SEO Service
 * Reads the SEO managed in the dashboard: page_seo plus its FAQs and image alt
 * text (public / read-only). Each page table (home_page, ...) shares its id with
 * one page_seo row.
 */

const PAGE_SEO_SELECT =
    '*, page_faqs!page_seo_id(id, questions, answers), alt_image!page_seo_id(id, source, image_alt)';

// Embedded rows come back unordered; keep them in the order they were added
function sortPageSeo(seo) {
    seo.page_faqs?.sort((a, b) => a.id - b.id);
    seo.alt_image?.sort((a, b) => a.id - b.id);
    return seo;
}

/**
 * Fetch the home page SEO. The first home_page row is the one the dashboard edits.
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function getHomePageSeo() {
    try {
        const { data, error } = await supabase
            .from('home_page')
            .select(`page_seo(${PAGE_SEO_SELECT})`)
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (error) throw error;

        const seo = data?.page_seo ?? null;
        return { data: seo ? sortPageSeo(seo) : null, error: null };
    } catch (error) {
        console.error('[Page SEO Service] Error fetching home page SEO:', error);
        return { data: null, error: error.message };
    }
}
