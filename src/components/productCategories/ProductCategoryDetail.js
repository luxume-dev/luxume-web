import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, ArrowRight, ChevronDown } from 'lucide-react';
import LocationHero from '@/components/locations/LocationHero';
import LocationQuoteButton from '@/components/locations/LocationQuoteButton';
import { breadcrumbSchema } from '@/lib/schema';
import { jsonLd } from '@/lib/pageSeo';
import { getRelatedCategories } from '@/data/productCategories';

/**
 * Product category detail page body.
 * Without `location` it renders /product-category/[category];
 * with a location it renders /[location]/[category] and adds local content.
 */
export default function ProductCategoryDetail({ category, location = null, locations = [] }) {
  const where = location ? ` in ${location.name}` : '';
  const heading = `${category.name}${where}`;
  const path = location ? `/${location.slug}/${category.slug}` : `/product-category/${category.slug}`;
  const related = getRelatedCategories(category.slug);
  const otherLocations = locations.filter((l) => l.slug !== location?.slug);

  const crumbs = location
    ? [
        { label: 'Home', href: '/' },
        { label: location.name, href: `/${location.slug}` },
        { label: category.name },
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Product Category', href: '/product-category' },
        { label: category.name },
      ];

  const breadcrumbs = breadcrumbSchema(crumbs.map((c) => ({ name: c.label, path: c.href === '/' ? '' : c.href ?? path })));

  const faqs = category.faqs.map((f) => ({ ...f, q: location ? f.q.replace(/\?$/, `${where}?`) : f.q }));
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const description = location
    ? `Buy ${category.name.toLowerCase()} in ${location.name} from Luxume. ${category.summary} ${location.areas.length ? `Delivered across ${location.areas.slice(0, 3).join(', ')} and more through our authorised dealers.` : ''}`.trim()
    : category.summary;

  return (
    <main className="min-h-screen bg-white">
      {breadcrumbs && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />

      <LocationHero
        image={location?.image || category.image}
        eyebrow={location ? location.location || location.name : 'Product Category'}
        heading={heading}
        description={description}
        crumbs={crumbs}
      >
        <div className="flex flex-wrap gap-4">
          <LocationQuoteButton productName={`${category.name}${location ? ` – ${location.name}` : ''}`} label="Get a Quote" />
          <a
            href="#overview"
            className="px-8 py-3 rounded-[16px] font-lato font-semibold border-2 border-white text-white hover:bg-white hover:text-[#1a1b4b] transition-all duration-300"
          >
            Learn More
          </a>
        </div>
      </LocationHero>

      {/* Overview */}
      <section id="overview" className="py-16 md:py-20 px-4 md:px-8 scroll-mt-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
            <Image
              src={category.image}
              alt={heading}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
              {category.tagline}
            </span>
            <h2 className="aloevera-bold text-3xl md:text-[44px] leading-tight mt-2 mb-6" style={{ color: 'var(--secondary)' }}>
              About {heading}
            </h2>
            {category.overview.map((p) => (
              <p key={p.slice(0, 24)} className="font-lato text-gray-700 leading-relaxed text-[16px] mb-4">
                {p}
              </p>
            ))}
            {location?.dealerCount > 0 && (
              <p className="font-lato text-gray-700 leading-relaxed text-[16px] mb-4">
                In {location.name}, Luxume {category.name.toLowerCase()} are available through {location.dealerCount}{' '}
                authorised dealers.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="aloevera-bold text-3xl md:text-4xl text-center mb-12" style={{ color: 'var(--secondary)' }}>
            Why choose Luxume {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                <CheckCircle2 size={28} className="text-[#C83C64] mb-4" />
                <h3 className="font-lato font-bold text-lg text-[#1a1b4b] mb-2">{f.title}</h3>
                <p className="font-lato text-sm text-gray-600 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs + applications */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="aloevera-bold text-3xl text-[#1a1b4b] mb-6">Technical specifications</h2>
            <div className="rounded-2xl border border-gray-200 overflow-hidden">
              <table className="w-full font-lato text-sm">
                <tbody>
                  {category.specs.map(([label, value], i) => (
                    <tr key={label} className={i % 2 ? 'bg-white' : 'bg-gray-50'}>
                      <th scope="row" className="text-left font-semibold text-[#1a1b4b] px-5 py-3.5 w-1/2">
                        {label}
                      </th>
                      <td className="px-5 py-3.5 text-gray-700">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="font-lato text-xs text-gray-400 mt-3">Specifications are indicative and may vary by product line.</p>
          </div>
          <div>
            <h2 className="aloevera-bold text-3xl text-[#1a1b4b] mb-6">Applications</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {category.applications.map((a) => (
                <li key={a} className="flex items-center gap-3 font-lato text-[15px] text-gray-700 px-4 py-3 rounded-xl bg-gray-50">
                  <span className="w-2 h-2 rounded-full bg-[#C83C64] shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Local section (location pages only) */}
      {location && (location.builtDescription || location.areas.length > 0 || location.dealers.length > 0) && (
        <section className="py-16 px-4 md:px-8 bg-stone-100">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="aloevera-bold text-3xl text-[#1a1b4b] mb-5">
                {category.name} for {location.name}&rsquo;s climate
              </h2>
              {location.builtDescription && (
                <p className="font-lato text-gray-700 leading-relaxed text-[16px] mb-6 whitespace-pre-line">{location.builtDescription}</p>
              )}
              {location.areas.length > 0 && (
              <>
              <h3 className="font-lato font-bold text-lg text-[#1a1b4b] mb-3">Areas we deliver to</h3>
              <ul className="flex flex-wrap gap-2">
                {location.areas.map((area) => (
                  <li key={area} className="flex items-center gap-1.5 font-lato text-sm font-semibold px-3 py-1.5 rounded-full bg-white border border-pink-100 text-[#1a1b4b]">
                    <MapPin size={13} className="text-[#C83C64]" /> {area}
                  </li>
                ))}
              </ul>
              </>
              )}
            </div>
            {location.dealers.length > 0 && (
            <div>
              <h2 className="aloevera-bold text-3xl text-[#1a1b4b] mb-5">Dealers in {location.name}</h2>
              <div className="space-y-4">
                {location.dealers.map((d) => (
                  <div key={d.id} className="bg-white p-5 rounded-2xl border border-gray-100">
                    <h3 className="font-lato font-bold text-[#1a1b4b] mb-1">{d.name}</h3>
                    {d.area && (
                      <p className="font-lato text-sm text-gray-500 flex items-center gap-2 mb-1">
                        <MapPin size={14} className="text-[#C83C64]" /> {d.area}
                      </p>
                    )}
                    {d.phone && (
                      <a href={`tel:${d.phone.replace(/[^\d+]/g, '')}`} className="font-lato text-sm font-semibold text-[#C83C64] flex items-center gap-2 hover:underline">
                        <Phone size={14} /> {d.phone}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
            )}
          </div>
        </section>
      )}

      {/* FAQs */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="aloevera-bold text-3xl md:text-4xl text-center text-[#1a1b4b] mb-10">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-gray-200 px-6 py-4 open:border-pink-200 open:bg-pink-50/40">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-lato font-semibold text-[#1a1b4b]">
                  {f.q}
                  <ChevronDown size={18} className="shrink-0 text-[#C83C64] transition-transform group-open:rotate-180" />
                </summary>
                <p className="font-lato text-gray-600 leading-relaxed mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Available in (location links for this category) */}
      {otherLocations.length > 0 && (
      <section className="py-14 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="aloevera-bold text-2xl md:text-3xl text-[#1a1b4b] mb-6">
            {location ? `${category.name} in other locations` : `${category.name} near you`}
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {otherLocations.map((l) => (
                <Link
                  key={l.slug}
                  href={`/${l.slug}/${category.slug}`}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white border border-gray-200 font-lato font-semibold text-sm text-[#1a1b4b] hover:border-[#C83C64] hover:text-[#C83C64] transition-colors"
                >
                  <MapPin size={14} /> {l.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
      )}

      {/* Related categories */}
      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h2 className="aloevera-bold text-3xl md:text-4xl text-[#1a1b4b]">Related categories</h2>
            <Link href="/product-category" className="font-lato font-semibold text-[#C83C64] flex items-center gap-2 hover:underline">
              View all categories <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {related.map((c) => (
              <ProductCategoryCard key={c.slug} category={c} href={location ? `/${location.slug}/${c.slug}` : undefined} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-5xl mx-auto rounded-3xl bg-[#1a1b4b] px-6 py-12 md:p-14 text-center">
          <h2 className="aloevera-bold text-white text-3xl md:text-4xl mb-4">Need {category.name.toLowerCase()}{where}?</h2>
          <p className="font-lato text-white/80 max-w-xl mx-auto mb-8">
            Tell us about your project and our team will share pricing, colour options and delivery timelines.
          </p>
          <LocationQuoteButton productName={`${category.name}${location ? ` – ${location.name}` : ''}`} label="Request a Quote" />
        </div>
      </section>
    </main>
  );
}

/** Card used on the listing page and in "Related categories". */
export function ProductCategoryCard({ category, href }) {
  return (
    <Link
      href={href || `/product-category/${category.slug}`}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        <Image
          src={category.image}
          alt={category.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="aloevera-bold text-2xl text-[#1a1b4b] mb-2">{category.name}</h3>
        <p className="font-lato text-gray-600 text-[14px] leading-relaxed line-clamp-3 mb-5">{category.summary}</p>
        <span className="mt-auto flex items-center gap-2 font-lato font-semibold text-[#C83C64]">
          View details <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
