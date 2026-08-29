/**
 * Centralized Query Key Factory
 * All TanStack Query keys in one place for consistency and easy invalidation.
 */

export const queryKeys = {
  products: {
    all: ['products'],
    detail: (slug) => ['products', slug],
  },
  careers: {
    all: ['careers'],
    detail: (id) => ['careers', id],
  },
  blogs: {
    all: ['blogs'],
    detail: (slug) => ['blogs', slug],
  },
  projects: {
    // Value kept as-is from the previous inline usage so existing cache
    // entries and any in-flight queries keep matching.
    all: ['projects', 'active'],
  },
  testimonials: {
    all: ['testimonials'],
  },
};
