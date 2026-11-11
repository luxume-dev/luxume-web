import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Store, ArrowRight } from 'lucide-react';
import LocationHero from '@/components/locations/LocationHero';
import FaqSection from '@/components/FaqSection';
import AltTextProvider from '@/providers/AltTextProvider';
import { getLocationPageContent } from '@/services/supabase';
import { getLocationPageSeoCached } from '@/lib/pageSeo.server';
// Banner filter hidden for now; uncomment this, finderLocations and <LocationFinder> below to bring it back.
// import LocationFinder from '@/components/locations/LocationFinder';
import { breadcrumbSchema } from '@/lib/schema';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import { locations, getLocationCatalogue, getProductsForLocation } from '@/data/locations';

// Products come live from the dashboard (brands / profiles)
export const revalidate = 10;

// Content and SEO are managed from the dashboard (location_page -> page_seo).
// Default title / description, used only when the SEO tab leaves them empty.
const DEFAULT_METADATA = {
  title: 'Roofing Sheets Near You | Luxume Locations',
  description:
    'Find Luxume, Luxume+ and Silverlux roofing sheets in Ernakulam, Kottayam, Kollam and across Kerala. See products, profiles and dealers in your location.',
};

export async function generateMetadata() {
  const seo = buildSeoMetadata(await getLocationPageSeoCached(), { path: '/locations' });
  return {
    ...DEFAULT_METADATA,
    ...seo,
    alternates: { canonical: '/locations' },
  };
}

const text = (value) => (typeof value === 'string' ? value.trim() : '');

export default async function LocationsPage() {
  // None of these throw: a failure renders the page without the dashboard content / SEO extras
  const [catalogue, { data }, seo] = await Promise.all([
    getLocationCatalogue(),
    getLocationPageContent(),
    getLocationPageSeoCached(),
  ]);
  // Empty fields hide their part of the page
  const page = {
    banner_img: text(data?.banner_img),
    label: text(data?.label),
    title: text(data?.title),
    description: text(data?.description),
    supply_title: text(data?.supply_title),
    supply_description: text(data?.supply_description),
  };
  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);
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
    <AltTextProvider alts={buildAltMap(seo)}>
    <main className="min-h-screen bg-white">
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      )}
      {seo?.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}

      <LocationHero
        image={page.banner_img}
        eyebrow={page.label}
        heading={page.title}
        description={page.description}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Locations' }]}
      >
        {/* <LocationFinder locations={finderLocations} /> */}
      </LocationHero>

      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {(page.supply_title || page.supply_description) && (
            <div className="text-center mb-12">
              {page.supply_title && (
                <h2 className="aloevera-bold text-4xl md:text-[48px] leading-tight mb-4" style={{ color: 'var(--secondary)' }}>
                  {page.supply_title}
                </h2>
              )}
              {page.supply_description && (
                <p className="lato-regular text-[16px] max-w-2xl mx-auto leading-[28px] whitespace-pre-line" style={{ color: 'var(--text-description)' }}>
                  {page.supply_description}
                </p>
              )}
            </div>
          )}

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

      <FaqSection faqs={faqs} />
    </main>
    </AltTextProvider>
  );
}
