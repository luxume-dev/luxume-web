import { supabase } from '@/lib/supabase';

/**
 * Page SEO Service
 * Reads the SEO managed in the dashboard: page_seo plus its FAQs and image alt
 * text (public / read-only). Each page row links to one page_seo row:
 *   home_page.id, about_page.id, blog_page.id, careers_page.id -> page_seo.id
 *   project_page.page_seo_id                   -> page_seo.id
 *   guideline_page.id                          -> page_seo.id
 *   contact_page.page_seo_id                   -> page_seo.id
 *   blogs.blog_id                              -> page_seo.id (one per post)
 *   careers.page_seo_id                        -> page_seo.id (one per job opening)
 *   company_page.page_seo_id                   -> page_seo.id (one per company page)
 */

export const PAGE_SEO_SELECT =
    '*, page_faqs!page_seo_id(id, questions, answers), alt_image!page_seo_id(id, source, image_alt)';

// Embedded rows come back unordered; keep them in the order they were added
export function sortPageSeo(seo) {
    seo.page_faqs?.sort((a, b) => a.id - b.id);
    seo.alt_image?.sort((a, b) => a.id - b.id);
    return seo;
}

/**
 * Fetch the SEO linked to a single-row page table (home_page, about_page, ...).
 * The first row is the one the dashboard edits.
 * @param {string} table
 * @param {string} [relation] page_seo embed, with a foreign key name when the
 *   table has more than one link to page_seo, e.g. 'page_seo!about_page_id_fkey'
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
async function getPageSeo(table, relation = 'page_seo') {
    try {
        const { data, error } = await supabase
            .from(table)
            .select(`page_seo:${relation}(${PAGE_SEO_SELECT})`)
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (error) throw error;

        const seo = data?.page_seo ?? null;
        return { data: seo ? sortPageSeo(seo) : null, error: null };
    } catch (error) {
        console.error(`[Page SEO Service] Error fetching ${table} SEO:`, error);
        return { data: null, error: error.message };
    }
}

/** Fetch the home page SEO (home_page -> page_seo). */
export function getHomePageSeo() {
    return getPageSeo('home_page');
}

/** Fetch the About page SEO (about_page -> page_seo). */
export function getAboutPageSeo() {
    return getPageSeo('about_page', 'page_seo!about_page_id_fkey');
}

/** Fetch the Blog page SEO (blog_page -> page_seo). */
export function getBlogPageSeo() {
    return getPageSeo('blog_page', 'page_seo!blog_page_id_fkey');
}

/** Fetch the Careers page SEO (careers_page -> page_seo). */
export function getCareersPageSeo() {
    return getPageSeo('careers_page', 'page_seo!careers_page_id_fkey');
}

/** Fetch the Projects page SEO (project_page.page_seo_id -> page_seo). */
export function getProjectPageSeo() {
    return getPageSeo('project_page', 'page_seo!project_page_page_seo_id_fkey');
}

/** Fetch the Contact page SEO (contact_page.page_seo_id -> page_seo). */
export function getContactPageSeo() {
    return getPageSeo('contact_page', 'page_seo!contact_page_page_seo_id_fkey');
}

/**
 * Fetch one active job opening's SEO (careers.page_seo_id -> page_seo).
 * @param {string} id
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function getCareerSeo(id) {
    try {
        const { data, error } = await supabase
            .from('careers')
            .select(`page_seo:page_seo!careers_page_seo_id_fkey(${PAGE_SEO_SELECT})`)
            .eq('id', id)
            .eq('is_active', true)
            .limit(1)
            .maybeSingle();

        if (error) throw error;

        const seo = data?.page_seo ?? null;
        return { data: seo ? sortPageSeo(seo) : null, error: null };
    } catch (error) {
        console.error('[Page SEO Service] Error fetching job opening SEO:', error);
        return { data: null, error: error.message };
    }
}

/**
 * Fetch one published blog post's SEO (blogs.blog_id -> page_seo).
 * @param {string} slug
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function getBlogPostSeo(slug) {
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select(`page_seo:page_seo!blogs_blog_id_fkey(${PAGE_SEO_SELECT})`)
            .eq('slug', slug)
            .eq('status', 'published')
            .limit(1)
            .maybeSingle();

        if (error) throw error;

        const seo = data?.page_seo ?? null;
        return { data: seo ? sortPageSeo(seo) : null, error: null };
    } catch (error) {
        console.error('[Page SEO Service] Error fetching blog post SEO:', error);
        return { data: null, error: error.message };
    }
}

/** Fetch the Do's & Don'ts page SEO (guideline_page.id -> page_seo). */
export function getGuidelinePageSeo() {
    return getPageSeo('guideline_page', 'page_seo!guideline_page_id_fkey');
}
