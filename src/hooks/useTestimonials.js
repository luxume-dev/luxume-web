'use client';

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/queryKeys';
import { getTestimonials } from '@/services/supabase/testimonials.service';

/**
 * Fetch all active testimonials
 */
export function useTestimonials() {
    return useQuery({
        queryKey: queryKeys.testimonials.all,
        queryFn: async () => {
            const { data, error } = await getTestimonials();
            if (error) throw new Error(error);
            return data;
        },
    });
}
