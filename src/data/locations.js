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
 * shortcut: the locations themselves (cities, dealers, stats, which products
 * are sold where) are still sample data hardcoded below. When they move to the
 * dashboard, `locations` becomes a table and `availability` a join table
 * (location -> brand slug -> profile slugs).
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

/* ─── Locations (sample data) ─── */
export const locations = [
  {
    slug: 'ernakulam',
    name: 'Ernakulam',
    state: 'Kerala',
    region: 'Central Kerala',
    isHeadOffice: true,
    heroImage: '/images/luxume-hero.webp',
    tagline: 'Roofing sheets from our home city',
    intro:
      'Ernakulam is where Luxume began, and it is still home to our head office on Chittoor Road. From high-rise apartments in Kakkanad to warehouses along the NH 66 corridor, Luxume, Luxume+ and Silverlux sheets cover thousands of buildings across the district.',
    climateNote:
      'Coastal humidity and salt-laden air near Fort Kochi and Vypin make corrosion resistance essential, which is why every Luxume sheet is built on an aluminium-zinc coated steel base.',
    serviceAreas: ['Kochi', 'Kakkanad', 'Aluva', 'Edappally', 'Perumbavoor', 'Muvattupuzha', 'Kothamangalam', 'Angamaly', 'Tripunithura', 'Fort Kochi'],
    stats: { dealers: 24, projects: '1,200+', delivery: '24 hrs' },
    dealers: [
      { name: 'Luxume Head Office', area: 'Chittoor Road, Ernakulam', phone: '+91 97785 57752' },
      { name: 'Sample Roofing Centre', area: 'Aluva', phone: '+91 90000 00001' },
      { name: 'Sample Steel Traders', area: 'Perumbavoor', phone: '+91 90000 00002' },
    ],
    // Head office: the full range
    availability: {
      luxume: ['trafford-sheet', 'cladding-sheet', 'profile-ridge', 'corner-flash', 'ridges'],
      'luxume-plus': ['trafford-sheet', 'cladding-sheet', 'profile-ridge', 'corner-flash', 'ridges'],
      'luxume-silverlux': ['trafford-sheet', 'cladding-sheet', 'profile-ridge', 'corner-flash', 'ridges'],
    },
  },
  {
    slug: 'kottayam',
    name: 'Kottayam',
    state: 'Kerala',
    region: 'Central Kerala',
    heroImage: '/images/product-hero.webp',
    tagline: 'Leak-free roofs for the land of letters',
    intro:
      'Kottayam homes are known for their sloping roofs, and more of them are now built with Luxume+ Trafford sheets and matching ridges. Rubber processing units and estates across the district rely on Silverlux sheets too.',
    climateNote:
      'With some of the heaviest rainfall in the state, Kottayam roofs need fast drainage and watertight laps. Trafford sheets with matching ridges and flashings shed water quickly through the monsoon.',
    serviceAreas: ['Kottayam Town', 'Changanassery', 'Pala', 'Ettumanoor', 'Vaikom', 'Kanjirappally', 'Mundakayam', 'Erattupetta'],
    stats: { dealers: 14, projects: '650+', delivery: '48 hrs' },
    dealers: [
      { name: 'Sample Roofing Mart', area: 'Kottayam Town', phone: '+91 90000 00011' },
      { name: 'Sample Building Supplies', area: 'Pala', phone: '+91 90000 00012' },
    ],
    availability: {
      'luxume-plus': ['trafford-sheet', 'profile-ridge', 'ridges'],
      'luxume-silverlux': ['trafford-sheet', 'cladding-sheet'],
    },
  },
  {
    slug: 'kollam',
    name: 'Kollam',
    state: 'Kerala',
    region: 'South Kerala',
    heroImage: '/images/about-hero.webp',
    tagline: 'Corrosion-resistant roofing for the coast',
    intro:
      'From cashew factories to coastal homes along Ashtamudi Lake, Kollam needs roofing that stands up to sea air. Luxume and Silverlux sheets are supplied across the district through our dealer network.',
    climateNote:
      'Kollam’s long coastline means constant exposure to salt spray. Aluminium-zinc coated steel resists the rust that quickly eats through ordinary GI sheets.',
    serviceAreas: ['Kollam Town', 'Karunagappally', 'Kottarakkara', 'Punalur', 'Chavara', 'Paravur', 'Anchal', 'Kundara'],
    stats: { dealers: 11, projects: '480+', delivery: '48 hrs' },
    dealers: [
      { name: 'Sample Coastal Roofing', area: 'Kollam Town', phone: '+91 90000 00021' },
      { name: 'Sample Sheet House', area: 'Kottarakkara', phone: '+91 90000 00022' },
    ],
    availability: {
      luxume: ['trafford-sheet', 'cladding-sheet', 'corner-flash'],
      'luxume-silverlux': ['trafford-sheet', 'cladding-sheet', 'profile-ridge', 'corner-flash', 'ridges'],
    },
  },
  {
    slug: 'thrissur',
    name: 'Thrissur',
    state: 'Kerala',
    region: 'Central Kerala',
    heroImage: '/images/luxume-hero.webp',
    tagline: 'Roofing for the cultural capital',
    intro:
      'Thrissur’s mix of heritage homes, new villas and busy commercial towns makes it one of our most varied markets. Luxume+ is a favourite for houses, while Luxume cladding sheets cover warehouses around Ollur and Chalakudy.',
    climateNote:
      'Hot summers and heavy monsoons mean Thrissur roofs need both heat reflectivity and fast drainage. Luxume+’s reflective coating helps keep interiors cooler through April and May.',
    serviceAreas: ['Thrissur Town', 'Chalakudy', 'Irinjalakuda', 'Kodungallur', 'Guruvayur', 'Kunnamkulam', 'Ollur', 'Wadakkanchery'],
    stats: { dealers: 16, projects: '720+', delivery: '24 hrs' },
    dealers: [
      { name: 'Sample Roof World', area: 'Thrissur Town', phone: '+91 90000 00031' },
      { name: 'Sample Steel Point', area: 'Chalakudy', phone: '+91 90000 00032' },
    ],
    availability: {
      luxume: ['cladding-sheet', 'corner-flash'],
      'luxume-plus': ['trafford-sheet', 'profile-ridge', 'ridges', 'corner-flash'],
    },
  },
  {
    slug: 'thiruvananthapuram',
    name: 'Thiruvananthapuram',
    state: 'Kerala',
    region: 'South Kerala',
    heroImage: '/images/product-hero.webp',
    tagline: 'Modern roofs for the capital city',
    intro:
      'From Technopark offices to new homes in Kazhakkoottam and Neyyattinkara, the capital is building fast. Luxume supplies Luxume, Luxume+ and Silverlux sheets across the district.',
    climateNote:
      'Close to the coast and with two monsoon seasons, Thiruvananthapuram roofs face both salt air and long wet spells. Luxume’s aluminium-zinc coating is designed for exactly that combination.',
    serviceAreas: ['Thiruvananthapuram City', 'Kazhakkoottam', 'Neyyattinkara', 'Attingal', 'Nedumangad', 'Varkala', 'Kovalam'],
    stats: { dealers: 12, projects: '540+', delivery: '72 hrs' },
    dealers: [
      { name: 'Sample Capital Roofing', area: 'Kazhakkoottam', phone: '+91 90000 00041' },
      { name: 'Sample Building Depot', area: 'Neyyattinkara', phone: '+91 90000 00042' },
    ],
    availability: {
      luxume: ['trafford-sheet', 'ridges'],
      'luxume-plus': ['trafford-sheet', 'cladding-sheet', 'profile-ridge'],
      'luxume-silverlux': ['trafford-sheet'],
    },
  },
  {
    slug: 'kozhikode',
    name: 'Kozhikode',
    state: 'Kerala',
    region: 'North Kerala',
    heroImage: '/images/about-hero.webp',
    tagline: 'Trusted roofing across Malabar',
    intro:
      'Kozhikode is our gateway to Malabar. Homes, mosques, schools and commercial complexes across the district are roofed with Luxume sheets supplied through dealers in the city and the surrounding towns.',
    climateNote:
      'The Malabar coast gets intense south-west monsoon rain. Watertight side laps, matching ridges and corner flashings keep Luxume roofs dry through the heaviest downpours.',
    serviceAreas: ['Kozhikode City', 'Vadakara', 'Koyilandy', 'Thamarassery', 'Mukkam', 'Feroke', 'Ramanattukara'],
    stats: { dealers: 13, projects: '590+', delivery: '72 hrs' },
    dealers: [
      { name: 'Sample Malabar Roofing', area: 'Kozhikode City', phone: '+91 90000 00051' },
      { name: 'Sample Sheet Centre', area: 'Vadakara', phone: '+91 90000 00052' },
    ],
    availability: {
      luxume: ['trafford-sheet', 'cladding-sheet', 'profile-ridge', 'corner-flash', 'ridges'],
      'luxume-plus': ['trafford-sheet', 'ridges'],
    },
  },
];

/**
 * Optional hand-written copy for a specific location + product page, keyed
 * `${location}/${brand slug}`. Anything not set falls back to the template in
 * getComboContent().
 */
const comboOverrides = {
  'ernakulam/luxume-plus': {
    intro:
      'Luxume+ is manufactured and dispatched from Ernakulam, so customers across Kochi, Aluva and Perumbavoor get the shortest lead times and direct factory support. It is the most popular choice for new homes and re-roofing projects in the district.',
  },
  'kottayam/luxume-silverlux': {
    intro:
      'Rubber processing units, estates and farm buildings across Kottayam rely on Luxume Silverlux: an aluminium-zinc coated sheet that resists rust through the district’s long, heavy monsoon.',
  },
};

/* ─── Lookups (pass in the catalogue from getLocationCatalogue) ─── */

export function getLocation(slug) {
  return locations.find((l) => l.slug === slug) ?? null;
}

/** Products sold in a location, each carrying only the profiles available there. */
export function getProductsForLocation(catalogue, location) {
  if (!location) return [];
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

/** Locations where a product is sold. */
export function getLocationsForProduct(productSlug) {
  return locations.filter((l) => productSlug in l.availability);
}

/** Every valid location + product pair, for static params and the sitemap. */
export function getAllCombos(catalogue) {
  return locations.flatMap((l) =>
    getProductsForLocation(catalogue, l).map((p) => ({ location: l.slug, product: p.slug })),
  );
}

/* ─── Combination page copy ─── */

/** Copy for /locations/[location]/[product]: hand-written override, else template. */
export function getComboContent(location, product) {
  const override = comboOverrides[`${location.slug}/${product.slug}`] ?? {};
  const name = location.name;
  const title = product.title;
  const profileNames = product.profiles.map((p) => p.title);

  return {
    heading: override.heading ?? `${title} Roofing Sheets in ${name}`,
    intro:
      override.intro ??
      `Looking for ${title} roofing sheets in ${name}? Luxume supplies ${title} across ${name} district through ${location.stats.dealers} authorised dealers, with delivery in about ${location.stats.delivery} to most sites.`,
    why: override.why ?? [
      {
        title: `Made for ${location.region} weather`,
        text: location.climateNote,
      },
      {
        title: 'Local dealers, local stock',
        text: `Our ${name} dealers keep popular colours and profiles in stock, so most orders are cut to length and dispatched within ${location.stats.delivery}.`,
      },
      {
        title: 'Expert advice on site',
        text: `Not sure which profile suits your building? The Luxume team in ${name} can visit, measure and recommend the right specification.`,
      },
      {
        title: 'Backed by the Luxume guarantee',
        text: `Every ${title} sheet sold in ${name} carries the same guarantee as sheets bought directly from our Ernakulam head office.`,
      },
    ],
    faqs: override.faqs ?? [
      {
        id: 'price',
        questions: `What is the price of ${title} in ${name}?`,
        answers: `Prices depend on profile, colour, length and quantity. Request a quote and our ${name} team will send you an exact price for your roof, usually within one working day.`,
      },
      {
        id: 'delivery',
        questions: `How quickly can ${title} be delivered in ${name}?`,
        answers: `Most orders in ${name} are cut to length and delivered in about ${location.stats.delivery}. Large or custom orders may take a little longer.`,
      },
      {
        id: 'areas',
        questions: `Which areas in ${name} do you deliver to?`,
        answers: `We deliver across ${name} district, including ${location.serviceAreas.slice(0, 5).join(', ')} and surrounding areas.`,
      },
      ...(profileNames.length
        ? [
            {
              id: 'profiles',
              questions: `Which ${title} profiles are available in ${name}?`,
              answers: `In ${name} you can order ${title} as ${
                profileNames.length > 1
                  ? `${profileNames.slice(0, -1).join(', ')} and ${profileNames.at(-1)}`
                  : profileNames[0]
              }.`,
            },
          ]
        : []),
    ],
  };
}
