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
};
