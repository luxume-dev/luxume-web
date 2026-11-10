import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle, MapPin, Phone, ArrowRight } from 'lucide-react';
import LocationHero from '@/components/locations/LocationHero';
import LocationQuoteButton from '@/components/locations/LocationQuoteButton';
import FaqSection from '@/components/FaqSection';
import { breadcrumbSchema } from '@/lib/schema';
import { faqPageSchema, jsonLd } from '@/lib/pageSeo';
import { summarise } from '@/lib/text';
import {
  getAllCombos,
  getLocation,
  getLocationCatalogue,
  getProductsForLocation,
  getLocationsForProduct,
  getComboContent,
} from '@/data/locations';

// Only brands listed in a location's `availability` (and present in the dashboard) get a page here.
export const dynamicParams = false;
// Products come live from the dashboard (brands / profiles)
export const revalidate = 10;

export async function generateStaticParams() {
  return getAllCombos(await getLocationCatalogue());
}

/** The location plus the product narrowed to the profiles sold there, or null. */
async function resolve(locationSlug, productSlug) {
  const location = getLocation(locationSlug);
  const products = getProductsForLocation(await getLocationCatalogue(), location);
  const product = products.find((p) => p.slug === productSlug);
  return location && product ? { location, product, products } : null;
}

export async function generateMetadata({ params }) {
  const { location: locationSlug, product: productSlug } = await params;
  const found = await resolve(locationSlug, productSlug);
  if (!found) return {};

  const content = getComboContent(found.location, found.product);
  return {
    title: `${content.heading} | Luxume`,
    description: summarise(content.intro),
    alternates: { canonical: `/locations/${locationSlug}/${productSlug}` },
  };
}

export default async function LocationProductPage({ params }) {
  const { location: locationSlug, product: productSlug } = await params;
  const found = await resolve(locationSlug, productSlug);
  if (!found) notFound();

  const { location, product, products } = found;
  const content = getComboContent(location, product);
  const otherProducts = products.filter((p) => p.slug !== productSlug);
  const otherLocations = getLocationsForProduct(productSlug).filter((l) => l.slug !== locationSlug);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Locations', path: '/locations' },
    { name: location.name, path: `/locations/${locationSlug}` },
    { name: product.title, path: `/locations/${locationSlug}/${productSlug}` },
  ]);
  const faqSchema = faqPageSchema(content.faqs);

  return (
    <main className="min-h-screen bg-white">
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}

      <LocationHero
        image={location.heroImage}
        eyebrow={`Available in ${location.name}`}
        heading={content.heading}
        description={content.intro}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: location.name, href: `/locations/${locationSlug}` },
          { label: product.title },
        ]}
      >
        <div className="flex flex-wrap gap-4">
          <LocationQuoteButton productName={product.title} profileType={`${location.name} enquiry`} />
          <a
            href="#profiles"
            className="px-8 py-3 rounded-[16px] font-lato font-semibold border-2 border-white text-white hover:bg-white hover:text-[#1a1b4b] transition-all duration-300"
          >
            See Profiles
          </a>
        </div>
      </LocationHero>

      {/* Product overview */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden bg-gray-50 shadow-xl">
            <Image src={product.image} alt={product.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div>
            <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
              Product Overview
            </span>
            <h2 className="font-aloevera text-3xl md:text-4xl font-bold mt-2 mb-6" style={{ color: '#1a1b4b' }}>
              {product.title}
            </h2>
            <p className="font-lato text-gray-600 leading-relaxed text-lg mb-8 whitespace-pre-line">{product.description}</p>
            <ul className="grid grid-cols-2 gap-3 mb-8">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 font-lato text-sm font-semibold text-[#1a1b4b]">
                  <CheckCircle size={16} className="text-[#C83C64] shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
            <Link
              href={`/products/${product.slug}`}
              className="inline-flex items-center gap-2 font-lato font-semibold text-[#C83C64] hover:underline"
            >
              Full {product.title} details <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Profiles available in this location */}
      <section id="profiles" className="py-16 px-4 md:px-8 scroll-mt-24" style={{ backgroundColor: '#f8f7ff' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1a1b4b' }}>
            Profiles available in {location.name}
          </h2>
          <p className="font-lato text-gray-500 mb-10">
            {product.profiles.length} profile{product.profiles.length === 1 ? '' : 's'} of {product.title} stocked by our {location.name} dealers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {product.profiles.map((pr) => (
              <article
                key={pr.slug}
                id={pr.slug}
                className="scroll-mt-28 bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-[200px_1fr] target:ring-2 target:ring-[#C83C64]"
              >
                <div className="relative h-52 sm:h-full bg-gray-100">
                  <Image src={pr.image} alt={`${pr.title} – ${product.title} in ${location.name}`} fill sizes="(max-width: 640px) 100vw, 200px" className="object-cover" />
                </div>
                <div className="p-6 flex flex-col">
                  <h3 className="font-aloevera text-xl font-bold mb-2" style={{ color: '#1a1b4b' }}>
                    {pr.title}
                  </h3>
                  {pr.description && (
                    <p className="font-lato text-gray-600 text-sm leading-relaxed mb-4">{pr.description}</p>
                  )}
                  <div className="mt-auto flex flex-wrap items-center gap-4">
                    <LocationQuoteButton productName={product.title} profileType={pr.title} label="Quote this profile" />
                    <Link
                      href={`/products/${product.slug}/${pr.slug}`}
                      className="font-lato text-sm font-semibold text-[#C83C64] hover:underline"
                    >
                      View profile
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why buy in this location */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-10" style={{ color: '#1a1b4b' }}>
            Why buy {product.title} from Luxume in {location.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.why.map((item) => (
              <div key={item.title} className="p-7 rounded-2xl border border-gray-100 hover:border-pink-100 hover:shadow-lg transition-all">
                <CheckCircle size={22} className="text-[#C83C64] mb-4" />
                <h3 className="font-aloevera text-lg font-bold mb-2" style={{ color: '#1a1b4b' }}>
                  {item.title}
                </h3>
                <p className="font-lato text-gray-500 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dealers + service areas */}
      <section className="py-16 px-4 md:px-8 bg-stone-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="font-aloevera text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1a1b4b' }}>
              Where to buy in {location.name}
            </h2>
            <div className="space-y-4">
              {location.dealers.map((d) => (
                <div key={d.name} className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-gray-100">
                  <div>
                    <h3 className="font-lato font-bold text-[#1a1b4b]">{d.name}</h3>
                    <p className="font-lato text-sm text-gray-500 flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#C83C64]" /> {d.area}
                    </p>
                  </div>
                  <a
                    href={`tel:${d.phone.replace(/\s+/g, '')}`}
                    className="shrink-0 font-lato text-sm font-semibold text-[#C83C64] flex items-center gap-1.5 hover:underline"
                  >
                    <Phone size={14} /> {d.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-aloevera text-2xl md:text-3xl font-bold mb-6" style={{ color: '#1a1b4b' }}>
              Delivery areas
            </h2>
            <ul className="flex flex-wrap gap-3">
              {location.serviceAreas.map((area) => (
                <li key={area} className="font-lato text-sm font-semibold px-4 py-2 rounded-full bg-white border border-pink-100 text-[#1a1b4b]">
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection faqs={content.faqs} title={`${product.title} in ${location.name}: FAQs`} />

      {/* Cross links: other products here, same product elsewhere */}
      <section className="py-16 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {otherProducts.length > 0 && (
            <div>
              <h2 className="font-aloevera text-2xl font-bold mb-5" style={{ color: '#1a1b4b' }}>
                More products in {location.name}
              </h2>
              <ul className="space-y-3">
                {otherProducts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/locations/${locationSlug}/${p.slug}`}
                      className="group flex items-center justify-between p-4 rounded-xl bg-white border border-gray-100 hover:border-[#C83C64] transition-colors font-lato font-semibold text-[#1a1b4b]"
                    >
                      {p.title}
                      <ArrowRight size={16} className="text-[#C83C64] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {otherLocations.length > 0 && (
            <div>
              <h2 className="font-aloevera text-2xl font-bold mb-5" style={{ color: '#1a1b4b' }}>
                {product.title} in other locations
              </h2>
              <div className="flex flex-wrap gap-3">
                {otherLocations.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/locations/${l.slug}/${productSlug}`}
                    className="px-5 py-2.5 rounded-full bg-white border border-gray-200 font-lato font-semibold text-sm text-[#1a1b4b] hover:border-[#C83C64] hover:text-[#C83C64] transition-colors"
                  >
                    {l.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
