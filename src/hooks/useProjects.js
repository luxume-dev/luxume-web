'use client';

import { useQuery } from '@tanstack/react-query';
import { projectsQuery, homeFeaturedProjectsQuery } from '@/lib/queries';

/**
 * Fetch all active projects
 */
export function useProjects() {
  return useQuery(projectsQuery());
}

/**
 * Fetch the active projects marked "Show on Home Page" in the dashboard
 */
export function useHomeFeaturedProjects() {
  return useQuery(homeFeaturedProjectsQuery());
}
