/**
 * Shared TanStack Query definitions.
 *
 * Deliberately has no 'use client' directive: server components prefetch with
 * these and client hooks consume them, so the query key AND the fetcher are
 * guaranteed identical on both sides. If they diverged, the server-rendered
 * markup would be discarded and refetched on hydration — which is exactly the
 * bug this file exists to prevent.
 */
import { queryKeys } from '@/lib/queryKeys';
import { supabase } from '@/lib/supabase';
import {
  getPublishedBlogs,
  getBlogBySlug,
  getActiveCareers,
  getCareerById,
  getActiveProjects,
  getTestimonials,
} from '@/services/supabase';

/** Services return { data, error }; unwrap consistently. */
async function unwrap(promise) {
  const { data, error } = await promise;
  if (error) throw new Error(typeof error === 'string' ? error : error.message);
  return data;
}

export const productsQuery = () => ({
  queryKey: queryKeys.products.all,
  queryFn: async () => {
    const { data, error } = await supabase
      .from('brands')
      .select('id, title, slug, description, cover_image_url, features, display_order')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  },
});

export const productQuery = (slug) => ({
  queryKey: queryKeys.products.detail(slug),
  queryFn: async () => {
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', slug)
      .limit(1)
      .single();
    if (brandError) throw new Error(brandError.message);

    // Resolve profile_ids into full profile records, preserving their order.
    let profiles = [];
    const profileIds = brand.profile_ids;
    if (Array.isArray(profileIds) && profileIds.length > 0) {
      const { data: pData, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .in('id', profileIds);
      if (!pError) {
        profiles = profileIds.map((id) => pData.find((r) => r.id === id)).filter(Boolean);
      }
    }

    return { ...brand, profiles };
  },
  enabled: !!slug,
});

export const blogsQuery = () => ({
  queryKey: queryKeys.blogs.all,
  queryFn: () => unwrap(getPublishedBlogs()),
});

export const blogQuery = (slug) => ({
  queryKey: queryKeys.blogs.detail(slug),
  queryFn: () => unwrap(getBlogBySlug(slug)),
  enabled: !!slug,
});

export const careersQuery = () => ({
  queryKey: queryKeys.careers.all,
  queryFn: () => unwrap(getActiveCareers()),
});

export const careerQuery = (id) => ({
  queryKey: queryKeys.careers.detail(id),
  queryFn: () => unwrap(getCareerById(id)),
  enabled: !!id,
});

export const projectsQuery = () => ({
  queryKey: queryKeys.projects.all,
  queryFn: async () => (await unwrap(getActiveProjects())) || [],
});

export const testimonialsQuery = () => ({
  queryKey: queryKeys.testimonials.all,
  queryFn: () => unwrap(getTestimonials()),
});
