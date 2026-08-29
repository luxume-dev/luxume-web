'use client';

import { useQuery } from '@tanstack/react-query';
import { testimonialsQuery } from '@/lib/queries';

/**
 * Fetch all active testimonials
 */
export function useTestimonials() {
  return useQuery(testimonialsQuery());
}
