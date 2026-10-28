'use client';

import { createContext, useCallback, useContext } from 'react';
import { normaliseImageSrc } from '@/lib/pageSeo';

/**
 * Alt text managed in the dashboard (alt_image rows), keyed by image source.
 *
 * Components outside a provider get an empty map, so the lookup simply returns
 * their hard-coded fallback alt.
 */
const AltTextContext = createContext({});

export default function AltTextProvider({ alts = {}, children }) {
  return <AltTextContext.Provider value={alts}>{children}</AltTextContext.Provider>;
}

/** Returns getAlt(src, fallback): the dashboard alt for src, else fallback. */
export function useAltLookup() {
  const alts = useContext(AltTextContext);
  return useCallback((src, fallback = '') => alts[normaliseImageSrc(src)] ?? fallback, [alts]);
}
