'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getPublishedBlogs, getBlogBySlug } from '@/services/supabase';

/**
 * Fetch all published blogs
 */
export function useBlogs() {
  return useQuery({
    queryKey: queryKeys.blogs.all,
    queryFn: async () => {
      const { data, error } = await getPublishedBlogs();
      if (error) throw new Error(error);
      return data;
    },
  });
}

/**
 * Fetch a single blog by slug
 * @param {string} slug
 */
export function useBlog(slug) {
  return useQuery({
    queryKey: queryKeys.blogs.detail(slug),
    queryFn: async () => {
      const { data, error } = await getBlogBySlug(slug);
      if (error) throw new Error(error);
      return data;
    },
    enabled: !!slug,
  });
}
