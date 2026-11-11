import { cache } from 'react';
import { supabase } from '@/lib/supabase';
import { slugify } from '@/lib/text';

/**
 * Location module.
 *
 * Products and profiles are REAL: they come live from the `brands` and
 * `profiles` tables (the same data as /products), so titles, images,
 * descriptions and features always match the product pages.
 *
 * The cities come from the `locations` table (services/supabase/locations.service.js).
 * Dealers come from the `dealers` table (dashboard → Dealers, picked per city).
 * Which products are sold where is still static below, keyed by slug. Later
 * `availability` can become a join table (location -> brand slug -> profile slugs).
 *
 * `availability` keys are brand slugs (brands.slug); values are profile slugs,
 * derived from the profile title the same way /products/[brand]/[profile] does
 * (e.g. "Trafford sheet" -> "trafford-sheet"). Slugs that do not exist in the
 * database are ignored, so a renamed brand/profile just drops out of the page.
 */

/* ─── Real product catalogue (brands + their profiles) ─── */

/**
 * Every brand with its profiles, shaped for the location pages.
 * Cached per request so metadata + page + static params share one fetch.
 * Never throws: on error the location pages render without products.
 */
export const getLocationCatalogue = cache(async () => {
  try {
    const [{ data: brands, error: brandsError }, { data: profiles, error: profilesError }] = await Promise.all([
      supabase
        .from('brands')
        .select('id, title, slug, description, cover_image_url, features, profile_ids, display_order')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false }),
      supabase.from('profiles').select('id, title, description, image_url'),
    ]);
    if (brandsError) throw brandsError;
    if (profilesError) throw profilesError;

    const profileById = new Map((profiles ?? []).map((p) => [p.id, p]));

    return (brands ?? [])
      .filter((b) => b.slug)
      .map((b) => {
        // Same order as the brand page; first profile wins when two share a title,
        // matching how /products/[brand]/[profile] resolves the slug.
        const seen = new Set();
        const brandProfiles = (b.profile_ids ?? [])
          .map((id) => profileById.get(id))
          .filter(Boolean)
          .map((p) => ({
            slug: slugify(p.title),
            title: p.title?.trim(),
            description: p.description?.trim() || '',
            image: p.image_url || b.cover_image_url || '/images/productdetail.png',
          }))
          .filter((p) => p.slug && !seen.has(p.slug) && seen.add(p.slug));

        return {
          slug: b.slug,
          title: b.title?.trim(),
          description: b.description?.trim() || '',
          image: b.cover_image_url || '/images/productdetail.png',
          highlights: (Array.isArray(b.features) ? b.features : [])
            .map((f) => f?.title?.trim())
            .filter(Boolean)
            .slice(0, 4),
          profiles: brandProfiles,
        };
      });
  } catch (error) {
    console.error('[Locations] Error fetching product catalogue:', error);
    return [];
  }
});

/* ─── Static per-location product availability ─── */
/**
 * The cities themselves live in the `locations` table (dashboard → Locations).
 * Only product availability is still hardcoded here, keyed by the location
 * slug. A location without an entry shows the full product catalogue.
 */
const STATIC_LOCATION_DATA = {
  ernakulam: {
    // Head office: the full range
    availability: {
      luxume: ['trafford-sheet', 'cladding-sheet', 'profile-ridge', 'corner-flash', 'ridges'],
      'luxume-plus': ['trafford-sheet', 'cladding-sheet', 'profile-ridge', 'corner-flash', 'ridges'],
      'luxume-silverlux': ['trafford-sheet', 'cladding-sheet', 'profile-ridge', 'corner-flash', 'ridges'],
    },
  },
  kottayam: {
    availability: {
      'luxume-plus': ['trafford-sheet', 'profile-ridge', 'ridges'],
      'luxume-silverlux': ['trafford-sheet', 'cladding-sheet'],
    },
  },
  kollam: {
    availability: {
      luxume: ['trafford-sheet', 'cladding-sheet', 'corner-flash'],
      'luxume-silverlux': ['trafford-sheet', 'cladding-sheet', 'profile-ridge', 'corner-flash', 'ridges'],
    },
  },
  thrissur: {
    availability: {
      luxume: ['cladding-sheet', 'corner-flash'],
      'luxume-plus': ['trafford-sheet', 'profile-ridge', 'ridges', 'corner-flash'],
    },
  },
  thiruvananthapuram: {
    availability: {
      luxume: ['trafford-sheet', 'ridges'],
      'luxume-plus': ['trafford-sheet', 'cladding-sheet', 'profile-ridge'],
      'luxume-silverlux': ['trafford-sheet'],
    },
  },
  kozhikode: {
    availability: {
      luxume: ['trafford-sheet', 'cladding-sheet', 'profile-ridge', 'corner-flash', 'ridges'],
      'luxume-plus': ['trafford-sheet', 'ridges'],
    },
  },
};

/** { availability } for a slug; availability null = every product. */
export function getStaticLocationData(slug) {
  return {
    availability: STATIC_LOCATION_DATA[slug]?.availability ?? null,
  };
}

/* ─── Lookups (pass in the catalogue from getLocationCatalogue) ─── */

/** Products sold in a location, each carrying only the profiles available there. */
export function getProductsForLocation(catalogue, location) {
  if (!location) return [];
  if (!location.availability) return catalogue;
  return Object.entries(location.availability)
    .map(([productSlug, profileSlugs]) => {
      const product = catalogue.find((p) => p.slug === productSlug);
      if (!product) return null;
      return {
        ...product,
        profiles: product.profiles.filter((p) => profileSlugs.includes(p.slug)),
      };
    })
    .filter(Boolean);
}
