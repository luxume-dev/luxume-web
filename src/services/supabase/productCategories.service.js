import { cache } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Product Categories Service
 * Categories managed in the dashboard (Content → Product Categories), table `product_categories`.
 *
 *   /[slug]               the category's own page (banner: label / title / description)
 *   /[location]/[slug]    the category in a city (banner: detail_title / detail_description,
 *                         where "{location}" is replaced by the city name)
 */

const text = (value) => (typeof value === 'string' ? value.trim() : '');
const list = (value) => (Array.isArray(value) ? value : []);

function normalise(row) {
  const name = text(row.name);
  return {
    id: row.id,
    slug: text(row.slug),
    name,
    // Banner (category page)
    label: text(row.label),
    title: text(row.title),
    description: text(row.description),
    buttons: list(row.buttons)
      .map((b) => ({ label: text(b?.label), link: text(b?.link) }))
      .filter((b) => b.label && b.link),
    bannerImage: text(row.banner_image),
    // Banner (location pages); may contain {location}
    detailTitle: text(row.detail_title),
    detailDescription: text(row.detail_description),
    // About
    aboutLabel: text(row.about_label),
    aboutTitle: text(row.about_title),
    aboutParagraphs: text(row.about_description)
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
    aboutImage: text(row.about_image),
    // Why choose
    whyLabel: text(row.why_label),
    whyCards: list(row.why_cards)
      .map((c) => ({ icon: text(c?.icon), title: text(c?.title), description: text(c?.description) }))
      .filter((c) => c.title || c.description),
    // Specs + applications
    specs: list(row.tech_spec)
      .map((s) => ({ label: text(s?.label), value: text(s?.value) }))
      .filter((s) => s.label || s.value),
    applications: list(row.application).map(text).filter(Boolean),
    // Related categories
    relatedTitle: text(row.related_title),
    relatedLabel: text(row.related_label),
    relatedLink: text(row.related_link),
  };
}

/**
 * Every category, in dashboard order. Cached per request so metadata, page and
 * static params share one fetch. Never throws: on error it returns [].
 */
export const getProductCategories = cache(async () => {
  try {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });
    if (error) throw error;
    return (data ?? []).filter((row) => text(row.slug) && text(row.name)).map(normalise);
  } catch (error) {
    console.error('[Product Categories Service] Error fetching product categories:', error);
    return [];
  }
});

export async function getProductCategoryBySlug(slug) {
  const categories = await getProductCategories();
  return categories.find((c) => c.slug === slug) ?? null;
}
