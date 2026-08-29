'use client';

import { useQuery } from '@tanstack/react-query';
import { productsQuery, productQuery } from '@/lib/queries';

/**
 * Fetch all brands (ordered by display_order ascending).
 * Definition lives in @/lib/queries so the server can prefetch the same thing.
 */
export function useProducts() {
  return useQuery(productsQuery());
}

/**
 * Fetch a single brand by slug
 * @param {string} slug
 */
export function useProduct(slug) {
  return useQuery(productQuery(slug));
}
