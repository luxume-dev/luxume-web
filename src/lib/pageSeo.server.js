import { cache } from 'react';
import {
  getAboutPageSeo,
  getBlogPageSeo,
  getBlogPostSeo,
  getCareersPageSeo,
  getCareerSeo,
  getHomePageSeo,
  getProjectPageSeo,
  getContactPageSeo,
  getGuidelinePageSeo,
  getAssurancePageSeo,
} from '@/services/supabase';

/**
 * Per-request cached page SEO lookups for server components.
 *
 * generateMetadata and the page itself both need the record; cache() makes
 * them share one Supabase request instead of two.
 */
export const getHomePageSeoCached = cache(async () => (await getHomePageSeo()).data);
export const getAboutPageSeoCached = cache(async () => (await getAboutPageSeo()).data);
export const getBlogPageSeoCached = cache(async () => (await getBlogPageSeo()).data);
export const getCareersPageSeoCached = cache(async () => (await getCareersPageSeo()).data);
export const getProjectPageSeoCached = cache(async () => (await getProjectPageSeo()).data);
export const getContactPageSeoCached = cache(async () => (await getContactPageSeo()).data);
export const getGuidelinePageSeoCached = cache(async () => (await getGuidelinePageSeo()).data);
export const getAssurancePageSeoCached = cache(async () => (await getAssurancePageSeo()).data);
export const getCareerSeoCached = cache(async (id) => (await getCareerSeo(id)).data);
export const getBlogPostSeoCached = cache(async (slug) => (await getBlogPostSeo(slug)).data);
