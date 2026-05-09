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
      .from('brands')
      .select('id, title, slug, description, cover_image_url, features')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return { data, error: null };
  } catch (error) {
    console.error('[Products Service] Error fetching products:', error);
    return { data: null, error: error.message };
  }
}

/**
 * Fetch a single brand by slug (full detail).
 * Resolves `profile_ids` uuid array into
 * full records from the `profiles` table.
 *
 * @param {string} slug - The brand slug
 * @returns {Promise<{data: Object|null, error: string|null}>}
 */
export async function getProductBySlug(slug) {
  try {
    // 1. Fetch the base brand row
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single();

    if (brandError) throw brandError;

    // 2. Resolve profiles —————————————————————————————————————————
    let profiles = [];
    const profileIds = brand.profile_ids;
    if (Array.isArray(profileIds) && profileIds.length > 0) {
      const { data: pData, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', profileIds);

      if (pError) {
        console.warn('[Products Service] Could not fetch profiles:', pError.message);
      } else {
        // Preserve the order defined by profile_ids
        profiles = profileIds
          .map((id) => pData.find((r) => r.id === id))
          .filter(Boolean);
      }
    }

    // 3. Return enriched brand object
    return {
      data: { ...brand, profiles },
      error: null,
    };
  } catch (error) {
    console.error('[Products Service] Error fetching brand by slug:', error);
    return { data: null, error: error.message };
  }
}
