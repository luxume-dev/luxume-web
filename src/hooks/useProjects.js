'use client';

import { useQuery } from '@tanstack/react-query';
import { projectsQuery } from '@/lib/queries';

/**
 * Fetch all active projects
 */
export function useProjects() {
  return useQuery(projectsQuery());
}
