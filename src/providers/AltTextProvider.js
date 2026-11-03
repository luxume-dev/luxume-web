'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { normaliseImageSrc } from '@/lib/pageSeo';

/**
 * Alt text managed in the dashboard, keyed by image / video source.
 *
 * The root layout provides the Media Library alt text for the whole site; a
 * page may nest another provider (its alt_image rows), which wins over it.
 * Components outside any provider get an empty map, so the lookup simply
 * returns their hard-coded fallback alt.
 */
const AltTextContext = createContext({});

export default function AltTextProvider({ alts = {}, children }) {
  const parent = useContext(AltTextContext);
  const merged = useMemo(() => ({ ...parent, ...alts }), [parent, alts]);
  return <AltTextContext.Provider value={merged}>{children}</AltTextContext.Provider>;
}

/** Returns getAlt(src, fallback): the dashboard alt for src, else fallback. */
export function useAltLookup() {
  const alts = useContext(AltTextContext);
  return useCallback((src, fallback = '') => alts[normaliseImageSrc(src)] ?? fallback, [alts]);
}
