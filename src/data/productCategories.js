/**
 * Product Category module.
 *
 * Standalone SEO / landing pages for roofing-sheet categories. These are NOT
 * linked to the `brands` / `profiles` tables used by /products — each category
 * is its own dedicated page with its own content.
 *
 * Routes:
 *   /product-category                     listing
 *   /product-category/[category]          detail
 *   /[location]/[category]                detail for a location (e.g. /ernakulam/gi-sheets)
 *
 * shortcut: all content below is dummy/sample copy. When it moves to the
 * dashboard, `productCategories` becomes a table and these helpers become queries.
 */

const SPEC_BASE = [
  ['Base metal', 'High-tensile steel (G550)'],
  ['Thickness', '0.35 mm – 0.60 mm'],
  ['Effective width', '1050 mm'],
  ['Length', 'Cut to size, up to 12 m'],
];

const COMMON_FAQS = (name) => [
  {
    q: `How long do ${name.toLowerCase()} last?`,
    a: `With correct installation and basic maintenance, Luxume ${name.toLowerCase()} are designed to last 20–30 years and are backed by our product warranty.`,
  },
  {
    q: `Can ${name.toLowerCase()} be cut to custom lengths?`,
    a: 'Yes. Sheets are roll-formed and cut to the exact length your roof needs, up to 12 metres, which reduces overlaps and wastage on site.',
  },
  {
    q: 'Do you provide installation support?',
    a: 'Our authorised dealers can connect you with trained installers and supply matching ridges, flashings and fasteners for a complete roofing system.',
  },
  {
    q: 'How do I get a price quote?',
    a: 'Click “Get a Quote”, share your roof size and location, and our team will get back to you with pricing and delivery timelines.',
  },
];

export const productCategories = [
  {
    slug: 'metal-roofing',
    name: 'Metal Roofing',
    image: '/images/corrugated-roofing-panels.webp',
    tagline: 'Strong, lightweight roofing for every building',
    summary:
      'Durable, lightweight metal roofing sheets that install fast and protect homes, factories and warehouses for decades.',
    overview: [
      'Metal roofing is the go-to choice for modern construction in Kerala. It is lighter than tiles or concrete, quicker to install and far more resistant to heavy monsoon rain.',
      'Luxume metal roofing sheets are roll-formed from high-tensile coated steel and finished with weather-resistant paint systems, giving you a roof that looks good and stays leak-free year after year.',
    ],
    features: [
      { title: 'Lightweight', text: 'Up to 80% lighter than clay tiles, reducing the load on your structure.' },
      { title: 'Fast installation', text: 'Long sheets cover large areas quickly with fewer joints.' },
      { title: 'Weather resistant', text: 'Engineered for heavy rain, strong winds and coastal humidity.' },
      { title: 'Low maintenance', text: 'No cracking, no moss, no regular repainting needed.' },
    ],
    specs: [...SPEC_BASE, ['Coating', 'Aluminium-zinc (AZ150)'], ['Finish', 'Glossy / matt colour coated']],
    applications: ['Residential homes', 'Warehouses', 'Factories', 'Car parks', 'Schools', 'Shopping complexes'],
  },
  {
    slug: 'steel-roofing',
    name: 'Steel Roofing',
    image: '/images/industrial-steel-sheets.webp',
    tagline: 'High-tensile steel built to take on the weather',
    summary:
      'High-tensile steel roofing that combines structural strength with long-lasting corrosion protection.',
    overview: [
      'Steel roofing gives you the strength to span wider purlins and the toughness to handle impact, wind uplift and years of sun and rain.',
      'Luxume steel roofing sheets use G550 high-tensile steel with a protective metallic coating and premium paint finish, so you get a roof that is both strong and good-looking.',
    ],
    features: [
      { title: 'High tensile strength', text: 'G550 steel allows wider spans with fewer supports.' },
      { title: 'Impact resistant', text: 'Withstands falling branches, hail and foot traffic during maintenance.' },
      { title: 'Fire safe', text: 'Non-combustible material that does not feed a fire.' },
      { title: '100% recyclable', text: 'Steel can be recycled endlessly without losing quality.' },
    ],
    specs: [...SPEC_BASE, ['Coating', 'AZ150 / Z275'], ['Yield strength', '550 MPa']],
    applications: ['Industrial sheds', 'Commercial buildings', 'Villas', 'Auditoriums', 'Godowns'],
  },
  {
    slug: 'colour-coated-steel-sheets',
    name: 'Colour-Coated Steel Sheets',
    image: '/images/color-coated-galvalume-sheets.webp',
    tagline: 'Long-lasting colour, lasting protection',
    summary:
      'Pre-painted steel sheets in a wide range of shades that resist fading, chalking and corrosion.',
    overview: [
      'Colour-coated steel sheets are pre-painted in a controlled factory process, giving an even, durable finish that site painting simply cannot match.',
      'Luxume colour-coated sheets use a multi-layer paint system over an aluminium-zinc base, so the colour stays bright and the steel stays protected for years.',
    ],
    features: [
      { title: 'Wide colour range', text: 'Choose from a palette of shades to match any architecture.' },
      { title: 'UV resistant', text: 'Paint system formulated to resist fading and chalking in strong sun.' },
      { title: 'Heat reflective', text: 'Lighter shades reflect solar heat and help keep interiors cooler.' },
      { title: 'Factory finish', text: 'Uniform coating thickness with no brush marks or patches.' },
    ],
    specs: [...SPEC_BASE, ['Paint system', 'RMP / SMP polyester'], ['Total paint thickness', '20–25 microns (top)']],
    applications: ['Homes and villas', 'Showrooms', 'Resorts', 'Commercial facades', 'Institutions'],
  },
  {
    slug: 'galvanised-roofing-sheets',
    name: 'Galvanised Roofing Sheets',
    image: '/images/precision-roofing-panels.webp',
    tagline: 'Zinc-protected sheets for dependable roofing',
    summary:
      'Zinc-coated steel roofing sheets that offer reliable rust protection at an economical price.',
    overview: [
      'Galvanised roofing sheets are steel sheets coated with a layer of zinc that protects the base metal from rust, making them a trusted, budget-friendly roofing choice.',
      'Luxume galvanised sheets come with uniform zinc coating and precise profiles for tight laps, so your roof stays watertight through the monsoon.',
    ],
    features: [
      { title: 'Rust protection', text: 'Zinc layer protects the steel even where the surface is scratched.' },
      { title: 'Economical', text: 'Cost-effective roofing for large areas and utility buildings.' },
      { title: 'Easy to work', text: 'Simple to cut, bend and fix on site with standard tools.' },
      { title: 'Consistent profile', text: 'Precision roll-forming for tight, leak-free overlaps.' },
    ],
    specs: [...SPEC_BASE, ['Coating', 'Zinc (Z120 – Z275)'], ['Finish', 'Plain / colour coated']],
    applications: ['Farm buildings', 'Storage sheds', 'Workshops', 'Temporary structures', 'Cattle sheds'],
  },
  {
    slug: 'galvalume-roofing-sheet',
    name: 'Galvalume Roofing Sheet',
    image: '/images/color-coated-galvalume-coils.webp',
    tagline: 'Aluminium-zinc protection that outlasts GI',
    summary:
      'Galvalume (aluminium-zinc) coated sheets that last up to four times longer than ordinary galvanised sheets.',
    overview: [
      'Galvalume is steel coated with an alloy of 55% aluminium, 43.4% zinc and 1.6% silicon. The aluminium forms a tough barrier while the zinc gives sacrificial protection at cut edges.',
      'Luxume Galvalume roofing sheets combine this coating with a premium paint system, making them ideal for Kerala’s humid, rainy and coastal conditions.',
    ],
    features: [
      { title: 'Superior corrosion resistance', text: 'Lasts up to 4× longer than standard GI in the same conditions.' },
      { title: 'Heat reflective', text: 'The aluminium content reflects heat better than zinc alone.' },
      { title: 'Cut-edge protection', text: 'Zinc in the alloy protects exposed edges from rust.' },
      { title: 'Long life', text: 'Designed for decades of performance with minimal upkeep.' },
    ],
    specs: [...SPEC_BASE, ['Coating', 'Al-Zn AZ150'], ['Alloy', '55% Al, 43.4% Zn, 1.6% Si']],
    applications: ['Coastal homes', 'Factories', 'Warehouses', 'Cold storage', 'Commercial roofing'],
  },
  {
    slug: 'aluminium-zinc-roofing-sheet',
    name: 'Aluminium Zinc Roofing Sheet',
    image: '/images/color-coated-galvalume-sheets.webp',
    tagline: 'The best of aluminium and zinc in one sheet',
    summary:
      'Aluminium-zinc roofing sheets that resist rust, reflect heat and stay strong in harsh coastal air.',
    overview: [
      'Aluminium-zinc roofing sheets bring together the barrier protection of aluminium and the self-healing protection of zinc for roofs that resist corrosion far better than plain galvanised steel.',
      'Every Luxume roofing sheet is built on an aluminium-zinc coated base, which is why our roofs hold up in places like Fort Kochi, Vypin and Kollam where salt air is constant.',
    ],
    features: [
      { title: 'Coastal grade', text: 'Built to resist salt spray and high humidity.' },
      { title: 'Cooler interiors', text: 'Reflects more solar heat than ordinary GI sheets.' },
      { title: 'Lightweight strength', text: 'High-tensile base with a light, easy-to-handle sheet.' },
      { title: 'Paint-ready', text: 'Excellent base for long-lasting colour coatings.' },
    ],
    specs: [...SPEC_BASE, ['Coating', 'AZ150'], ['Finish', 'Bare / colour coated']],
    applications: ['Seaside homes', 'Fishing harbours', 'Industrial roofs', 'Resorts', 'Warehouses'],
  },
  {
    slug: 'cladding-sheet',
    name: 'Cladding Sheet',
    image: '/images/premium-steel-construction-materials.webp',
    tagline: 'Clean, modern walls that protect and impress',
    summary:
      'Steel wall cladding sheets that give buildings a clean, modern look while protecting them from the elements.',
    overview: [
      'Cladding sheets cover the outer walls of a building, protecting the structure from rain and sun while giving it a sharp, finished look.',
      'Luxume cladding sheets come in clean profiles and a range of colours, making them popular for factories, showrooms and modern homes alike.',
    ],
    features: [
      { title: 'Modern appearance', text: 'Crisp lines and colours for a premium facade.' },
      { title: 'Weather barrier', text: 'Keeps rain and sun off the walls and structure.' },
      { title: 'Quick to install', text: 'Fixes directly to girts for fast wall enclosure.' },
      { title: 'Low upkeep', text: 'Factory-painted finish that stays clean and bright.' },
    ],
    specs: [...SPEC_BASE, ['Profile', 'Trapezoidal / plank'], ['Orientation', 'Vertical / horizontal']],
    applications: ['Factory walls', 'Showroom facades', 'Warehouses', 'Partition walls', 'Modern homes'],
  },
  {
    slug: 'gi-sheets',
    name: 'GI Sheets',
    image: '/images/industrial-steel-sheets.webp',
    tagline: 'Galvanised iron sheets for everyday building needs',
    summary:
      'Versatile galvanised iron (GI) sheets for roofing, cladding, ducting and general fabrication.',
    overview: [
      'GI sheets are steel sheets hot-dip coated with zinc. They are one of the most widely used building materials thanks to their strength, versatility and affordability.',
      'Luxume GI sheets are available plain or profiled, in a range of thicknesses for roofing, walling and fabrication work.',
    ],
    features: [
      { title: 'Versatile', text: 'Used for roofing, ducting, fencing, gutters and fabrication.' },
      { title: 'Affordable', text: 'A dependable option for budget-conscious projects.' },
      { title: 'Durable', text: 'Hot-dip zinc coating protects against everyday corrosion.' },
      { title: 'Widely available', text: 'Stocked across our dealer network for quick delivery.' },
    ],
    specs: [...SPEC_BASE, ['Coating', 'Zinc Z120 – Z275'], ['Form', 'Plain / corrugated / profiled']],
    applications: ['Roofing', 'Ducting', 'Gutters', 'Fencing', 'Fabrication', 'Sheds'],
  },
  {
    slug: 'ppgl-sheets',
    name: 'PPGL Sheets',
    image: '/images/color-coated-galvalume-coils.webp',
    tagline: 'Pre-painted Galvalume for colour that lasts',
    summary:
      'Pre-painted Galvalume (PPGL) sheets that combine Galvalume corrosion resistance with a durable colour finish.',
    overview: [
      'PPGL stands for Pre-Painted Galvalume. The sheet starts with an aluminium-zinc coated base and is then painted in a continuous coil-coating line for a durable, uniform finish.',
      'Luxume PPGL sheets give you the long life of Galvalume and the look of a premium painted roof, in a choice of colours and profiles.',
    ],
    features: [
      { title: 'Double protection', text: 'Galvalume base plus a paint layer for longer life.' },
      { title: 'Colour choice', text: 'Multiple shades to match homes and commercial buildings.' },
      { title: 'Fade resistant', text: 'UV-stable paint keeps colours bright for years.' },
      { title: 'Ready to install', text: 'No painting needed on site.' },
    ],
    specs: [...SPEC_BASE, ['Base coating', 'AZ150'], ['Paint system', 'RMP / SMP / HDP']],
    applications: ['Homes and villas', 'Commercial roofs', 'Facades', 'Pre-engineered buildings', 'Resorts'],
  },
  {
    slug: 'cladding-roofing-sheet',
    name: 'Cladding Roofing Sheet',
    image: '/images/precision-roofing-panels.webp',
    tagline: 'One profile for both roof and walls',
    summary:
      'Dual-purpose profiled sheets that work for both roofing and wall cladding, giving a matching finish.',
    overview: [
      'Cladding roofing sheets are profiled to perform on both the roof and the walls, so you can give your building a single, consistent look from top to bottom.',
      'Luxume cladding roofing sheets are ideal for industrial sheds and pre-engineered buildings where speed, strength and a uniform finish matter.',
    ],
    features: [
      { title: 'Dual use', text: 'Same sheet for roofing and walling.' },
      { title: 'Uniform look', text: 'Matching colour and profile across the building.' },
      { title: 'Strong profile', text: 'Deep ribs for stiffness and water drainage.' },
      { title: 'Fewer SKUs', text: 'Simplifies ordering and reduces site wastage.' },
    ],
    specs: [...SPEC_BASE, ['Profile', 'Trapezoidal'], ['Rib height', '28 mm – 32 mm']],
    applications: ['PEB structures', 'Industrial sheds', 'Warehouses', 'Workshops', 'Agri buildings'],
  },
  {
    slug: 'aluminium-zinc-coated-steel',
    name: 'Aluminium Zinc Coated Steel',
    image: '/images/premium-steel-construction-materials.webp',
    tagline: 'The base metal behind every long-lasting Luxume roof',
    summary:
      'Aluminium-zinc coated steel coils and sheets — the corrosion-resistant base for roofing, cladding and fabrication.',
    overview: [
      'Aluminium-zinc coated steel is the foundation of a long-lasting roof. Its metallic coating protects the steel core from rust, even in the most humid and coastal parts of Kerala.',
      'Luxume uses aluminium-zinc coated steel as the base for all of its roofing sheets, and also supplies it for fabrication and construction needs.',
    ],
    features: [
      { title: 'Corrosion resistant', text: 'Al-Zn alloy coating for long service life.' },
      { title: 'Versatile', text: 'Suitable for roofing, cladding, panels and fabrication.' },
      { title: 'Formable', text: 'Bends and roll-forms cleanly without cracking the coating.' },
      { title: 'Heat reflective', text: 'Bright metallic surface reflects solar heat.' },
    ],
    specs: [...SPEC_BASE, ['Coating', 'AZ70 – AZ150'], ['Form', 'Coils / sheets']],
    applications: ['Roofing', 'Wall cladding', 'Purlins and sections', 'Appliance panels', 'Fabrication'],
  },
].map((c) => ({ ...c, faqs: COMMON_FAQS(c.name) }));

/* ─── Lookups ─── */

export function getProductCategory(slug) {
  return productCategories.find((c) => c.slug === slug) ?? null;
}

/** A few other categories to show as "related" (stable order, skips the current one). */
export function getRelatedCategories(slug, count = 3) {
  const i = productCategories.findIndex((c) => c.slug === slug);
  const rest = productCategories.filter((c) => c.slug !== slug);
  if (i < 0) return rest.slice(0, count);
  return Array.from({ length: Math.min(count, rest.length) }, (_, n) => rest[(i + n) % rest.length]);
}
