import { supabase } from '@/lib/supabase';

/**
 * Product Category Page Service
 * Reads the /product-category page banner and "Browse by category" heading managed
 * in the dashboard (public / read-only). The first product_category_page row is the
 * one the dashboard edits.
 *
 * page_banner_image: image URL; label, title, description, browse_title, browse_description: text
 * (empty -> the page uses its default)
 *
 * @returns {Promise<{data: {page_banner_image, label, title, description, browse_title, browse_description}|null, error: string|null}>}
 */
export async function getProductCategoryPageContent() {
  try {
    const { data, error } = await supabase
      .from('product_category_page')
      .select('page_banner_image, label, title, description, browse_title, browse_description')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error('[Product Category Page Service] Error fetching product category page content:', error);
    return { data: null, error: error.message };
  }
}
