'use client';

import { useQuery } from '@tanstack/react-query';
import { blogsQuery, blogQuery } from '@/lib/queries';

/**
 * Fetch all published blogs
 */
export function useBlogs() {
  return useQuery(blogsQuery());
}

/**
 * Fetch a single blog by slug
 * @param {string} slug
 */
export function useBlog(slug) {
  return useQuery(blogQuery(slug));
}
