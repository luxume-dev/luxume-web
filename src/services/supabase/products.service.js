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
 * Fetch a single product by slug (full detail).
 * Resolves `profile_type_ids` and `paint_finish_ids` integer arrays into
 * full records from the `profile_types` and `paint_finishes` tables.
 *
 * @param {string} slug - The product slug
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function getProductBySlug(slug) {
  try {
    // 1. Fetch the base product row
    const { data: product, error: productError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single();

    if (productError) throw productError;

    // 2. Resolve profile types —————————————————————————————————————————
    let profileTypes = [];
    const profileTypeIds = product.profile_type_ids;
    if (Array.isArray(profileTypeIds) && profileTypeIds.length > 0) {
      const { data: ptData, error: ptError } = await supabase
        .from('profile_types')
        .select('*')
        .in('id', profileTypeIds);

      if (ptError) {
        console.warn('[Products Service] Could not fetch profile_types:', ptError.message);
      } else {
        // Preserve the order defined by profile_type_ids
        profileTypes = profileTypeIds
          .map((id) => ptData.find((r) => r.id === id))
          .filter(Boolean);
      }
    }

    // 3. Resolve paint finishes ————————————————————————————————————————
    let paintFinishes = [];
    const paintFinishIds = product.paint_finish_ids;
    if (Array.isArray(paintFinishIds) && paintFinishIds.length > 0) {
      const { data: pfData, error: pfError } = await supabase
        .from('paint_finishes')
        .select('*')
        .in('id', paintFinishIds);

      if (pfError) {
        console.warn('[Products Service] Could not fetch paint_finishes:', pfError.message);
      } else {
        // Preserve the order defined by paint_finish_ids
        paintFinishes = paintFinishIds
          .map((id) => pfData.find((r) => r.id === id))
          .filter(Boolean);
      }
    }

    // 4. Return enriched product object
    return {
      data: { ...product, profile_types: profileTypes, paint_finishes: paintFinishes },
      error: null,
    };
  } catch (error) {
    console.error('[Products Service] Error fetching product by slug:', error);
    return { data: null, error: error.message };
  }
}
