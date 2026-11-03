'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { projectsQuery, projectsInfiniteQuery, homeFeaturedProjectsQuery } from '@/lib/queries';

/**
 * Fetch all active projects
 */
export function useProjects() {
  return useQuery(projectsQuery());
}

/**
 * Fetch active projects in batches (Projects page "Load More")
 */
export function useProjectsInfinite() {
  return useInfiniteQuery(projectsInfiniteQuery());
}

/**
 * Fetch the active projects marked "Show on Home Page" in the dashboard
 */
export function useHomeFeaturedProjects() {
  return useQuery(homeFeaturedProjectsQuery());
}
