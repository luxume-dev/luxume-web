'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { supabase } from '@/lib/supabase';

/**
 * Fetch all brands (ordered by display_order ascending)
 */
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('id, title, slug, description, cover_image_url, features, display_order')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (error) throw new Error(error.message);
      return data;
    },
  });
}

/**
 * Fetch a single brand by slug
 * @param {string} slug
 */
export function useProduct(slug) {
  return useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: async () => {
      // Fetch base brand row
      const { data: brand, error: brandError } = await supabase
        .from('brands')
        .select('*')
        .eq('slug', slug)
        .limit(1)
        .single();
      if (brandError) throw new Error(brandError.message);

      // Resolve profile_ids into full profile records
      let profiles = [];
      const profileIds = brand.profile_ids;
      if (Array.isArray(profileIds) && profileIds.length > 0) {
        const { data: pData, error: pError } = await supabase
          .from('profiles')
          .select('*')
          .in('id', profileIds);
        if (!pError) {
          profiles = profileIds
            .map((id) => pData.find((r) => r.id === id))
            .filter(Boolean);
        }
      }

      return { ...brand, profiles };
    },
    enabled: !!slug,
  });
}
