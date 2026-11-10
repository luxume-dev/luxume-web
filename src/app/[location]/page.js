import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, Truck, Store, Building2, CloudRain } from 'lucide-react';
import LocationHero from '@/components/locations/LocationHero';
import { ProductCategoryCard } from '@/components/productCategories/ProductCategoryDetail';
import LocationQuoteButton from '@/components/locations/LocationQuoteButton';
import { breadcrumbSchema } from '@/lib/schema';
import { jsonLd } from '@/lib/pageSeo';
import { summarise } from '@/lib/text';
import { locations, getLocation } from '@/data/locations';
import { productCategories } from '@/data/productCategories';

// Only the locations in src/data/locations.js exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((l) => ({ location: l.slug }));
}

export async function generateMetadata({ params }) {
  const { location: slug } = await params;
  const location = getLocation(slug);
  if (!location) return {};

  return {
    title: `Roofing Sheets in ${location.name} | Luxume`,
    description: summarise(location.intro),
    alternates: { canonical: `/${slug}` },
  };
}

export default async function LocationPage({ params }) {
  const { location: slug } = await params;
  const location = getLocation(slug);
  if (!location) notFound();

  const others = locations.filter((l) => l.slug !== slug);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Locations', path: '/locations' },
    { name: location.name, path: `/${slug}` },
  ]);

  return (
    <main className="min-h-screen bg-white">
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      )}

      <LocationHero
        image={location.heroImage}
        eyebrow={location.tagline}
        heading={`Roofing Sheets in ${location.name}`}
        description={location.intro}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: location.name },
        ]}
      >
        <div className="flex flex-wrap gap-4">
          <LocationQuoteButton productName={`Enquiry – ${location.name}`} label="Get a Quote" />
          <a
            href="#categories"
            className="px-8 py-3 rounded-[16px] font-lato font-semibold border-2 border-white text-white hover:bg-white hover:text-[#1a1b4b] transition-all duration-300"
          >
            Browse Categories
          </a>
        </div>
      </LocationHero>

      {/* Quick stats */}
      <section className="px-4 md:px-8 -mt-10 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { Icon: Store, value: location.stats.dealers, label: 'Authorised dealers' },
            { Icon: Building2, value: location.stats.projects, label: 'Roofs completed' },
            { Icon: Truck, value: location.stats.delivery, label: 'Typical delivery' },
            { Icon: MapPin, value: location.serviceAreas.length, label: 'Towns served' },
          ].map(({ Icon, value, label }) => (
            <div key={label} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 text-center">
              <Icon size={22} className="mx-auto mb-2 text-[#C83C64]" />
              <div className="font-aloevera text-2xl font-bold text-[#1a1b4b]">{value}</div>
              <div className="font-lato text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Product categories in this location */}
      <section id="categories" className="py-16 md:py-20 px-4 md:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
              Product Categories
            </span>
            <h2 className="aloevera-bold text-4xl md:text-[48px] leading-tight mb-4" style={{ color: 'var(--secondary)' }}>
              Roofing sheets in {location.name}
            </h2>
            <p className="lato-regular text-[16px] max-w-2xl mx-auto leading-[28px]" style={{ color: 'var(--text-description)' }}>
              Explore every Luxume product category available in {location.name}, with features, specifications and local dealers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((c) => (
              <ProductCategoryCard key={c.slug} category={c} href={`/${slug}/${c.slug}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Climate + service areas */}
      <section className="py-16 px-4 md:px-8 bg-stone-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <span className="inline-flex items-center gap-2 font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
              <CloudRain size={14} /> Built for {location.name}
            </span>
            <h2 className="font-aloevera text-3xl md:text-4xl font-bold mt-2 mb-6" style={{ color: '#1a1b4b' }}>
              Why Luxume works in {location.name}
            </h2>
            <div className="relative">
              <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-[#C83C64]" />
              <p className="font-lato text-gray-700 leading-relaxed text-lg pl-6">{location.climateNote}</p>
            </div>
          </div>
          <div>
            <h3 className="font-aloevera text-2xl font-bold mb-5" style={{ color: '#1a1b4b' }}>
              Areas we serve in {location.name}
            </h3>
            <ul className="flex flex-wrap gap-3">
              {location.serviceAreas.map((area) => (
                <li
                  key={area}
                  className="flex items-center gap-2 font-lato text-sm font-semibold px-4 py-2 rounded-full bg-white border border-pink-100 text-[#1a1b4b]"
                >
                  <MapPin size={14} className="text-[#C83C64]" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Dealers */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-8" style={{ color: '#1a1b4b' }}>
            Dealers in {location.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {location.dealers.map((d) => (
              <div key={d.name} className="p-6 rounded-2xl border border-gray-100 hover:border-pink-100 hover:shadow-lg transition-all">
                <h3 className="font-lato font-bold text-lg text-[#1a1b4b] mb-2">{d.name}</h3>
                <p className="font-lato text-sm text-gray-500 flex items-center gap-2 mb-2">
                  <MapPin size={14} className="text-[#C83C64]" /> {d.area}
                </p>
                <a
                  href={`tel:${d.phone.replace(/\s+/g, '')}`}
                  className="font-lato text-sm font-semibold text-[#C83C64] flex items-center gap-2 hover:underline"
                >
                  <Phone size={14} /> {d.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other locations */}
      <section className="py-16 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-aloevera text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1a1b4b' }}>
            Other locations
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {others.map((l) => (
              <Link
                key={l.slug}
                href={`/${l.slug}`}
                className="px-5 py-2.5 rounded-full bg-white border border-gray-200 font-lato font-semibold text-sm text-[#1a1b4b] hover:border-[#C83C64] hover:text-[#C83C64] transition-colors"
              >
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
