import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

/**
 * Per-request QueryClient for server components.
 *
 * cache() scopes one instance to a single request, so prefetches made by a
 * layout and by the page beneath it share a cache and dehydrate together,
 * without leaking data between users.
 *
 * staleTime matches QueryProvider's so freshly hydrated data is not treated as
 * stale and immediately refetched on the client.
 */
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000,
        },
      },
    })
);

/**
 * Prefetch a list of query definitions from src/lib/queries.js.
 *
 * Uses settled semantics on purpose: a failing table degrades that section to
 * client-side fetching rather than throwing and taking down the whole page.
 */
export async function prefetch(queryClient, definitions) {
  await Promise.allSettled(
    definitions.map((definition) => queryClient.prefetchQuery(definition))
  );
  return queryClient;
}
