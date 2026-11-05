import { supabase } from '@/lib/supabase';

/**
 * Products Page Service
 * Reads the Products page managed in the dashboard (public / read-only).
 * The first product_page row is the one the dashboard edits.
 *
 * count_card (jsonb): [{ icon, title, label }]  icon: pasted SVG markup or an image URL
 *
 * @returns {Promise<{data: {title, banner_image, product_label, product_title, product_description, count_card}|null, error: string|null}>}
 */
export async function getProductPageContent() {
  try {
    const { data, error } = await supabase
      .from('product_page')
      .select('title, banner_image, product_label, product_title, product_description, count_card')
      .order('created_at', { ascending: true })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    return { data: data ?? null, error: null };
  } catch (error) {
    console.error('[Product Page Service] Error fetching product page content:', error);
    return { data: null, error: error.message };
  }
}
