'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getActiveCareers, getCareerById } from '@/services/supabase';

/**
 * Fetch all active careers
 */
export function useCareers() {
  return useQuery({
    queryKey: queryKeys.careers.all,
    queryFn: async () => {
      const { data, error } = await getActiveCareers();
      if (error) throw new Error(error);
      return data;
    },
  });
}

/**
 * Fetch a single career by ID
 * @param {string} id
 */
export function useCareer(id) {
  return useQuery({
    queryKey: queryKeys.careers.detail(id),
    queryFn: async () => {
      const { data, error } = await getCareerById(id);
      if (error) throw new Error(error);
      return data;
    },
    enabled: !!id,
  });
}
