import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Phone, CloudRain } from 'lucide-react';
import LocationHero from '@/components/locations/LocationHero';
import ProductCategoryDetail, {
  ProductCategoryCard,
  categoryHeading,
} from '@/components/productCategories/ProductCategoryDetail';
import LocationQuoteButton from '@/components/locations/LocationQuoteButton';
import { breadcrumbSchema } from '@/lib/schema';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import { getLocationSeoCached, getProductCategorySeoCached } from '@/lib/pageSeo.server';
import FaqSection from '@/components/FaqSection';
import BottomContent from '@/components/BottomContent';
import AltTextProvider from '@/providers/AltTextProvider';
import { summarise } from '@/lib/text';
import { iconSrc } from '@/lib/cmsList';
import { getLocations, getProductCategories } from '@/services/supabase';

// One top-level slug serves two kinds of page, both managed in the dashboard:
//   a location        /kottayam                      (table `locations`)
//   a product category /aluminium-zinc-coated-steel  (table `product_categories`)
// The dashboard stops a category from taking a location's slug; if both exist the location wins.
// Unknown slugs are a 404. Pages added later in the dashboard are rendered on their first visit.
export const revalidate = 10;

export async function generateStaticParams() {
  const [locations, categories] = await Promise.all([getLocations(), getProductCategories()]);
  return [...locations, ...categories].map((item) => ({ location: item.slug }));
}

async function findPage(slug) {
  const [locations, categories] = await Promise.all([getLocations(), getProductCategories()]);
  const location = locations.find((l) => l.slug === slug) ?? null;
  const category = location ? null : categories.find((c) => c.slug === slug) ?? null;
  return { locations, categories, location, category };
}

export async function generateMetadata({ params }) {
  const { location: slug } = await params;
  const { location, category } = await findPage(slug);
  if (category) return categoryMetadata(category);
  if (!location) return {};
  const seo = await getLocationSeoCached(slug);

  // Defaults from the page content; anything filled in on the dashboard's SEO tab wins
  const seoMetadata = buildSeoMetadata(seo, { path: `/${slug}` });
  const hasOgImage = Boolean(seo?.og_image?.trim());
  return {
    title: `${location.pageTitle} | Luxume`,
    description: summarise(location.description || location.builtDescription),
    ...seoMetadata,
    ...(location.image && !hasOgImage && {
      openGraph: { ...seoMetadata.openGraph, images: [location.image] },
      twitter: { ...seoMetadata.twitter, images: [location.image] },
    }),
    alternates: { canonical: `/${slug}` },
  };
}

async function categoryMetadata(category) {
  const seo = await getProductCategorySeoCached(category.slug);
  const { heading, description } = categoryHeading(category);
  const path = `/${category.slug}`;
  // Defaults from the page content; anything filled in on the dashboard's SEO tab wins
  const seoMetadata = buildSeoMetadata(seo, { path });
  const hasOgImage = Boolean(seo?.og_image?.trim());
  return {
    ...(heading && { title: heading }),
    description: summarise(description),
    ...seoMetadata,
    ...(category.bannerImage && !hasOgImage && {
      openGraph: { ...seoMetadata.openGraph, images: [category.bannerImage] },
      twitter: { ...seoMetadata.twitter, images: [category.bannerImage] },
    }),
    alternates: { canonical: path },
  };
}

export default async function SlugPage({ params }) {
  const { location: slug } = await params;
  const { locations, categories, location, category } = await findPage(slug);

  if (category) {
    const seo = await getProductCategorySeoCached(category.slug);
    return (
      <ProductCategoryDetail
        category={category}
        locations={locations}
        categories={categories}
        seo={seo}
      />
    );
  }

  if (!location) notFound();
  const seo = await getLocationSeoCached(slug);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  const others = locations.filter((l) => l.slug !== slug);
  const hasProductHeading = Boolean(location.productLabel || location.productTitle || location.productDescription);
  const hasBuilt = Boolean(location.builtLabel || location.builtTitle || location.builtDescription);
  const hasAreas = location.areas.length > 0;
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Locations', path: '/locations' },
    { name: location.name, path: `/${slug}` },
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
        image={location.image}
        eyebrow={location.pageLabel}
        heading={location.pageTitle}
        description={location.description}
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

      {/* Quick stats (dashboard: Stats Under Banner) */}
      {location.counts.length > 0 && (
        <section className="px-4 md:px-8 -mt-10 relative z-10">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {location.counts.map(({ icon, value, label }, i) => {
              const src = iconSrc(icon, '#C83C64');
              return (
                <div key={`${label}-${i}`} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5 text-center">
                  {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt="" aria-hidden="true" className="w-[22px] h-[22px] mx-auto mb-2 object-contain" />
                  ) : (
                    <MapPin size={22} className="mx-auto mb-2 text-[#C83C64]" />
                  )}
                  {value && <div className="font-aloevera text-2xl font-bold text-[#1a1b4b]">{value}</div>}
                  {label && <div className="font-lato text-xs text-gray-500">{label}</div>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Product categories in this location */}
      <section id="categories" className="py-16 md:py-20 px-4 md:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          {hasProductHeading && (
            <div className="text-center mb-12">
              {location.productLabel && (
                <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
                  {location.productLabel}
                </span>
              )}
              {location.productTitle && (
                <h2 className="aloevera-bold text-4xl md:text-[48px] leading-tight mb-4" style={{ color: 'var(--secondary)' }}>
                  {location.productTitle}
                </h2>
              )}
              {location.productDescription && (
                <p
                  className="lato-regular text-[16px] max-w-2xl mx-auto leading-[28px] whitespace-pre-line"
                  style={{ color: 'var(--text-description)' }}
                >
                  {location.productDescription}
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((c) => (
              <ProductCategoryCard key={c.slug} category={c} href={`/${slug}/${c.slug}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Built for (climate) + service areas */}
      {(hasBuilt || hasAreas) && (
        <section className="py-16 px-4 md:px-8 bg-stone-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            {hasBuilt && (
              <div>
                {location.builtLabel && (
                  <span className="inline-flex items-center gap-2 font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
                    <CloudRain size={14} /> {location.builtLabel}
                  </span>
                )}
                {location.builtTitle && (
                  <h2 className="font-aloevera text-3xl md:text-4xl font-bold mt-2 mb-6" style={{ color: '#1a1b4b' }}>
                    {location.builtTitle}
                  </h2>
                )}
                {location.builtDescription && (
                  <div className="relative">
                    <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full bg-[#C83C64]" />
                    <p className="font-lato text-gray-700 leading-relaxed text-lg pl-6 whitespace-pre-line">
                      {location.builtDescription}
                    </p>
                  </div>
                )}
              </div>
            )}
            {hasAreas && (
              <div className={hasBuilt ? '' : 'lg:col-span-2'}>
                {location.areaTitle && (
                  <h3 className="font-aloevera text-2xl font-bold mb-5" style={{ color: '#1a1b4b' }}>
                    {location.areaTitle}
                  </h3>
                )}
                <ul className="flex flex-wrap gap-3">
                  {location.areas.map((area) => (
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
            )}
          </div>
        </section>
      )}

      {/* Dealers: picked per city in the dashboard (Locations → Dealers) */}
      {location.dealers.length > 0 && (
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-8" style={{ color: '#1a1b4b' }}>
              Dealers in {location.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {location.dealers.map((d) => (
                <div key={d.id} className="p-6 rounded-2xl border border-gray-100 hover:border-pink-100 hover:shadow-lg transition-all">
                  <h3 className="font-lato font-bold text-lg text-[#1a1b4b] mb-2">{d.name}</h3>
                  {d.area && (
                    <p className="font-lato text-sm text-gray-500 flex items-center gap-2 mb-2">
                      <MapPin size={14} className="text-[#C83C64]" /> {d.area}
                    </p>
                  )}
                  {d.phone && (
                    <a
                      href={`tel:${d.phone.replace(/[^\d+]/g, '')}`}
                      className="font-lato text-sm font-semibold text-[#C83C64] flex items-center gap-2 hover:underline"
                    >
                      <Phone size={14} /> {d.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other locations */}
      {others.length > 0 && (
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
      )}

      <BottomContent html={seo?.bottom_content} />
      <FaqSection faqs={faqs} />
    </main>
    </AltTextProvider>
  );
}
