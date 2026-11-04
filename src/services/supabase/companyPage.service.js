import { cache } from 'react';
import { supabase } from '@/lib/supabase';
import { PAGE_SEO_SELECT, sortPageSeo } from './pageSeo.service';

/**
 * Company Page Service
 * Reads a company page (Privacy Policy, Terms & Conditions) managed in the
 * dashboard, with its SEO (public / read-only). One company_page row per slug.
 *
 * content (jsonb): a string of HTML from the dashboard's rich-text editor
 *   ("<h2>1. Information We Collect</h2><p>...</p>"). Older rows may hold
 *   blog-style blocks: [{ id, type, content, items?: [{ id, text }] }]
 * page_seo: company_page.page_seo_id -> page_seo (with page_faqs and alt_image)
 *
 * Wrapped in cache() so generateMetadata and the page share one request.
 *
 * @param {string} slug  'privacy-policy' | 'terms-conditions'
 * @returns {Promise<{data: {title, description, content, updated_at, created_at, page_seo}|null, error: string|null}>}
 */
export const getCompanyPage = cache(async (slug) => {
  try {
    const { data, error } = await supabase
      .from('company_page')
      .select(
        `title, description, content, updated_at, created_at, page_seo:page_seo!company_page_page_seo_id_fkey(${PAGE_SEO_SELECT})`
      )
      .eq('slug', slug)
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    if (data?.page_seo) sortPageSeo(data.page_seo);

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error(`[Company Page Service] Error fetching company page "${slug}":`, error);
    return { data: null, error: error.message };
  }
});
