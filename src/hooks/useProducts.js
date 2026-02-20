'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getProducts, getProductBySlug } from '@/services/supabase/products.service';

/**
 * Fetch all products
 */
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: async () => {
      const { data, error } = await getProducts();
      if (error) throw new Error(error);
      return data;
    },
  });
}

/**
 * Fetch a single product by slug
 * @param {string} slug
 */
export function useProduct(slug) {
  return useQuery({
    queryKey: queryKeys.products.detail(slug),
    queryFn: async () => {
      const { data, error } = await getProductBySlug(slug);
      if (error) throw new Error(error);
      return data;
    },
    enabled: !!slug,
  });
}
