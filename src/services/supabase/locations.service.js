import { cache } from 'react';
import { supabase } from '@/lib/supabase';
import { getStaticLocationData } from '@/data/locations';

/**
 * Locations Service
 * Cities managed in the dashboard (Content → Locations), table `locations`.
 * Dealers come from the `dealers` table (Content → Dealers), linked to each city
 * through `location_dealers` in the order picked in the dashboard.
 * Which products are sold where is still static in src/data/locations.js (keyed by slug).
 */

const text = (value) => (typeof value === 'string' ? value.trim() : '');

/** Stats under the banner: [{ icon, value, label }]; an old '{}' default reads as empty. */
function countList(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({ icon: text(item?.icon), value: text(item?.value), label: text(item?.label) }))
    .filter((item) => item.value || item.label);
}

/**
 * A stat whose label mentions dealers (e.g. "Authorised dealers") and has no
 * value entered shows the number of dealers linked to the city instead.
 */
function withDealerCount(counts, dealerCount) {
  return counts.map((item) =>
    !item.value && /dealer/i.test(item.label) ? { ...item, value: String(dealerCount) } : item
  );
}

/** Dealers linked to the city, in dashboard order: [{ id, name, area, phone }] */
function dealerList(links) {
  if (!Array.isArray(links)) return [];
  return [...links]
    .sort((a, b) => (a?.display_order ?? 0) - (b?.display_order ?? 0))
    .map((link) => link?.dealers)
    .filter(Boolean)
    .map((d) => ({
      id: d.id,
      name: text(d.dealer_name),
      area: text(d.dealer_location),
      phone: text(d.dealer_phone),
    }))
    .filter((d) => d.name);
}

function normalise(row) {
  const slug = text(row.slug);
  const name = text(row.name);
  const dealers = dealerList(row.location_dealers);
  const counts = withDealerCount(countList(row.count), dealers.length);
  return {
    id: row.id,
    slug,
    name,
    image: text(row.image),
    label: text(row.label),
    location: text(row.location),
    description: text(row.description),
    pageLabel: text(row.page_label),
    pageTitle: text(row.page_title) || `Roofing Sheets in ${name}`,
    counts,
    productLabel: text(row.product_label),
    productTitle: text(row.product_title),
    productDescription: text(row.product_description),
    builtLabel: text(row.built_label),
    builtTitle: text(row.built_title),
    builtDescription: text(row.built_description),
    areaTitle: text(row.area_title),
    areas: (Array.isArray(row.areas) ? row.areas : []).map(text).filter(Boolean),
    dealers,
    dealerCount: dealers.length,
    // Dealers figure on the /locations card: the dealers stat's value when one is
    // entered (e.g. "24+"), otherwise the number of linked dealers
    dealerCountLabel: counts.find((c) => /dealer/i.test(c.label))?.value || String(dealers.length),
    // Static for now: { availability }
    ...getStaticLocationData(slug),
  };
}

/**
 * Every location, in dashboard order. Cached per request so metadata, page and
 * static params share one fetch. Never throws: on error it returns [].
 */
export const getLocations = cache(async () => {
  try {
    const query = (select) =>
      supabase
        .from('locations')
        .select(select)
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: true });

    let { data, error } = await query(
      '*, location_dealers(display_order, dealers(id, dealer_name, dealer_location, dealer_phone))'
    );
    if (error) {
      // Dealer tables unreachable: still show the cities, without dealers
      console.error('[Locations Service] Error fetching dealers:', error);
      ({ data, error } = await query('*'));
    }
    if (error) throw error;
    return (data ?? []).filter((row) => text(row.slug) && text(row.name)).map(normalise);
  } catch (error) {
    console.error('[Locations Service] Error fetching locations:', error);
    return [];
  }
});

export async function getLocationBySlug(slug) {
  const locations = await getLocations();
  return locations.find((l) => l.slug === slug) ?? null;
}
