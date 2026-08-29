'use client';

import { useQuery } from '@tanstack/react-query';
import { careersQuery, careerQuery } from '@/lib/queries';

/**
 * Fetch all active careers
 */
export function useCareers() {
  return useQuery(careersQuery());
}

/**
 * Fetch a single career by ID
 * @param {string} id
 */
export function useCareer(id) {
  return useQuery(careerQuery(id));
}
