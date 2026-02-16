import { supabase } from '@/lib/supabase';

/**
 * Products Service
 * Handles all product-related Supabase operations (public / read-only)
 */

/**
 * Fetch all products for listing cards
 * @returns {Promise<{data: Array|null, error: string|null}>}
 */
export async function getProducts() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, title, slug, description, product_image_url, features, category')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('[Products Service] Error fetching products:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Fetch a single product by slug (full detail)
 * @param {string} slug - The product slug
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function getProductBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single();

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('[Products Service] Error fetching product by slug:', error);
    return { data: null, error: error.message };
  }
}
