'use client';

import { useQuery } from '@tanstack/react-query';
import { generalSettingsQuery } from '@/lib/queries';
import { resolveSiteSettings } from '@/lib/siteSettings';

/**
 * Header / footer settings from the dashboard, with defaults filled in.
 * Prefetched in the root layout, so this is ready on first render.
 * @returns {{ header, footer, footerBottom, isLoading: boolean }}
 */
export function useGeneralSettings() {
  const { data, isLoading } = useQuery(generalSettingsQuery());
  return { ...resolveSiteSettings(data), isLoading };
}
