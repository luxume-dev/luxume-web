import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Store, ArrowRight } from 'lucide-react';
import LocationHero from '@/components/locations/LocationHero';
// Banner filter hidden for now; uncomment this, finderLocations and <LocationFinder> below to bring it back.
// import LocationFinder from '@/components/locations/LocationFinder';
import { breadcrumbSchema } from '@/lib/schema';
import { jsonLd } from '@/lib/pageSeo';
import { locations, getLocationCatalogue, getProductsForLocation } from '@/data/locations';

// Products come live from the dashboard (brands / profiles)
export const revalidate = 10;

export const metadata = {
  title: 'Roofing Sheets Near You | Luxume Locations',
  description:
    'Find Luxume, Luxume+ and Silverlux roofing sheets in Ernakulam, Kottayam, Kollam and across Kerala. See products, profiles and dealers in your location.',
  alternates: { canonical: '/locations' },
};

export default async function LocationsPage() {
  const catalogue = await getLocationCatalogue();
  // const finderLocations = locations.map((l) => ({
  //   slug: l.slug,
  //   name: l.name,
  //   products: getProductsForLocation(catalogue, l).map(({ slug, title }) => ({ slug, title })),
  // }));

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Locations', path: '/locations' },
  ]);

  return (
    <main className="min-h-screen bg-white">
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      )}

      <LocationHero
        image="/images/luxume-hero.webp"
        eyebrow="Locations"
        heading="Luxume roofing, near you"
        description="Choose your location to see which Luxume products and profiles are available, find local dealers and get a quote."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Locations' }]}
      >
        {/* <LocationFinder locations={finderLocations} /> */}
      </LocationHero>

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="aloevera-bold text-4xl md:text-[48px] leading-tight mb-4" style={{ color: 'var(--secondary)' }}>
              Where we supply
            </h2>
            <p className="lato-regular text-[16px] max-w-2xl mx-auto leading-[28px]" style={{ color: 'var(--text-description)' }}>
              Luxume sheets reach every corner of Kerala through our authorised dealer network. Pick a district to see what is in stock there.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((l) => {
              const products = getProductsForLocation(catalogue, l);
              const profileCount = products.reduce((sum, p) => sum + p.profiles.length, 0);
              return (
                <Link
                  key={l.slug}
                  href={`/${l.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-52 bg-gray-100 overflow-hidden">
                    <Image
                      src={l.heroImage}
                      alt={`Luxume roofing in ${l.name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                      <h3 className="aloevera-bold text-white text-3xl">{l.name}</h3>
                      {l.isHeadOffice && (
                        <span className="font-lato text-xs font-bold px-3 py-1 rounded-full bg-[#C83C64] text-white">
                          Head Office
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="font-lato text-sm text-gray-500 flex items-center gap-1.5 mb-3">
                      <MapPin size={14} className="text-[#C83C64]" /> {l.region}, {l.state}
                    </p>
                    <p className="font-lato text-gray-600 text-[14px] leading-relaxed line-clamp-3 mb-5">{l.intro}</p>
                    <div className="grid grid-cols-3 gap-3 mb-6 text-center">
                      {[
                        [products.length, 'Products'],
                        [profileCount, 'Profiles'],
                        [l.stats.dealers, 'Dealers'],
                      ].map(([value, label]) => (
                        <div key={label} className="rounded-xl bg-gray-50 py-3">
                          <div className="font-aloevera text-xl font-bold text-[#1a1b4b]">{value}</div>
                          <div className="font-lato text-xs text-gray-500">{label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between font-lato font-semibold text-[#C83C64]">
                      <span className="flex items-center gap-2">
                        <Store size={16} /> View products
                      </span>
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
