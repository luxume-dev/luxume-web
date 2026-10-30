import { cache } from 'react';
import { getHomePageSeo } from '@/services/supabase';

/**
 * Per-request cached page SEO lookups for server components.
 *
 * generateMetadata and the page itself both need the record; cache() makes
 * them share one Supabase request instead of two.
 */
export const getHomePageSeoCached = cache(async () => (await getHomePageSeo()).data);
