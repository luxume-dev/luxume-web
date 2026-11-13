import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, MapPin, Phone, ArrowRight } from 'lucide-react';
import LocationHero from '@/components/locations/LocationHero';
import LocationQuoteButton from '@/components/locations/LocationQuoteButton';
import FaqSection from '@/components/FaqSection';
import BottomContent from '@/components/BottomContent';
import AltTextProvider from '@/providers/AltTextProvider';
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema';
import { buildAltMap, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import { iconSrc } from '@/lib/cmsList';
import { summarise } from '@/lib/text';

/* ─── Helpers shared with the route files ─── */

/** Replaces "{location}" in dashboard text with the city name. */
export function fillLocation(value, location) {
  return location ? value.replace(/\{\s*location\s*\}/gi, location.name) : value;
}

/** Banner title + text of a category page, with or without a location. Empty fields stay empty (hidden). */
export function categoryHeading(category, location = null) {
  if (!location) return { heading: category.title, description: category.description };
  return {
    heading: fillLocation(category.detailTitle, location),
    description: fillLocation(category.detailDescription, location),
  };
}

/** URL of a category page, with or without a location. */
export function categoryPath(category, location = null) {
  return location ? `/${location.slug}/${category.slug}` : `/${category.slug}`;
}

/** A few other categories to show as "related" (stable order, skips the current one). */
function relatedCategories(categories, slug, count = 3) {
  const i = categories.findIndex((c) => c.slug === slug);
  const rest = categories.filter((c) => c.slug !== slug);
  if (i < 0) return rest.slice(0, count);
  return Array.from({ length: Math.min(count, rest.length) }, (_, n) => rest[(i + n) % rest.length]);
}

// next/image only optimises local and Supabase images; other URLs are passed through as-is
const unoptimized = (src) => !(src.startsWith('/') || /\.supabase\.co\//.test(src));

const OUTLINE_BUTTON =
  'px-8 py-3 rounded-[16px] font-lato font-semibold border-2 border-white text-white hover:bg-white hover:text-[#1a1b4b] transition-all duration-300';
const SOLID_BUTTON =
  'px-8 py-3.5 rounded-[16px] text-white font-lato font-semibold bg-[#C83C64] hover:bg-[#a62f50] hover:shadow-lg transition-all duration-300';

/** Banner button from the dashboard: "#quote" opens the quote form, other links navigate. */
function BannerButton({ button, solid, productName }) {
  if (button.link.toLowerCase() === '#quote') {
    return (
      <LocationQuoteButton productName={productName} label={button.label} variant={solid ? 'solid' : 'outline'} />
    );
  }
  const className = solid ? SOLID_BUTTON : OUTLINE_BUTTON;
  if (button.link.startsWith('#') || /^(https?:|mailto:|tel:)/i.test(button.link)) {
    const external = /^https?:/i.test(button.link);
    return (
      <a
        href={button.link}
        className={className}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {button.label}
      </a>
    );
  }
  return (
    <Link href={button.link} className={className}>
      {button.label}
    </Link>
  );
}

/**
 * Product category page body, fed by the dashboard (table `product_categories`).
 * Without `location` it renders /[category]; with a location it renders
 * /[location]/[category], using the location banner text and adding local content.
 *
 * categories: every category (for "Related categories")
 * seo: the category's page_seo (FAQs + image alt text; meta tags are set by the route)
 */
export default function ProductCategoryDetail({
  category,
  location = null,
  locations = [],
  categories = [],
  seo = null,
}) {
  const { heading, description } = categoryHeading(category, location);
  const path = categoryPath(category, location);
  const where = location ? ` in ${location.name}` : '';
  const quoteName = `${category.name}${location ? ` – ${location.name}` : ''}`;
  const related = relatedCategories(categories, category.slug);
  const otherLocations = locations.filter((l) => l.slug !== location?.slug);
  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

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

  // The SEO tab's meta description belongs to the category's own page; city pages use their banner text
  const collection = collectionPageSchema({
    name: heading || category.name,
    description: (!location && seo?.meta_description?.trim()) || summarise(description),
    path,
    image: category.bannerImage,
  });

  const hasAbout = Boolean(category.aboutImage || category.aboutLabel || category.aboutTitle || category.aboutParagraphs.length);
  const hasLocal =
    location && (location.builtDescription || location.areas.length > 0 || location.dealers.length > 0);

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      <main className="min-h-screen bg-white">
        {collection && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(collection) }} />}
        {breadcrumbs && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />}
        {!location && seo?.schema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
        )}
        {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />}

        <LocationHero
          image={category.bannerImage}
          eyebrow={location ? location.location : category.label}
          heading={heading}
          description={description}
          crumbs={crumbs}
        >
          {category.buttons.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {category.buttons.map((button, i) => (
                <BannerButton key={`${button.label}-${i}`} button={button} solid={i === 0} productName={quoteName} />
              ))}
            </div>
          )}
        </LocationHero>

        {/* About */}
        {hasAbout && (
          <section id="overview" className="py-16 md:py-20 px-4 md:px-8 scroll-mt-24">
            <div
              className={`max-w-7xl mx-auto grid grid-cols-1 gap-10 lg:gap-16 items-center ${category.aboutImage ? 'lg:grid-cols-2' : ''}`}
            >
              {category.aboutImage && (
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
                  <Image
                    src={category.aboutImage}
                    alt={category.aboutTitle || heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    unoptimized={unoptimized(category.aboutImage)}
                    priority
                  />
                </div>
              )}
              <div>
                {category.aboutLabel && (
                  <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
                    {category.aboutLabel}
                  </span>
                )}
                {category.aboutTitle && (
                  <h2 className="aloevera-bold text-3xl md:text-[44px] leading-tight mt-2 mb-6" style={{ color: 'var(--secondary)' }}>
                    {category.aboutTitle}
                  </h2>
                )}
                {category.aboutParagraphs.map((p, i) => (
                  <p key={i} className="font-lato text-gray-700 leading-relaxed text-[16px] mb-4 whitespace-pre-line">
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
        )}

        {/* Why choose */}
        {category.whyCards.length > 0 && (
          <section className="py-16 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
            <div className="max-w-7xl mx-auto">
              {category.whyLabel && (
                <h2 className="aloevera-bold text-3xl md:text-4xl text-center mb-12" style={{ color: 'var(--secondary)' }}>
                  {category.whyLabel}
                </h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.whyCards.map((card, i) => {
                  const src = iconSrc(card.icon, '#C83C64');
                  return (
                    <div
                      key={`${card.title}-${i}`}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                    >
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt="" aria-hidden="true" className="w-7 h-7 mb-4 object-contain" />
                      ) : (
                        <CheckCircle2 size={28} className="text-[#C83C64] mb-4" />
                      )}
                      {card.title && <h3 className="font-lato font-bold text-lg text-[#1a1b4b] mb-2">{card.title}</h3>}
                      {card.description && (
                        <p className="font-lato text-sm text-gray-600 leading-relaxed whitespace-pre-line">{card.description}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Specs + applications */}
        {(category.specs.length > 0 || category.applications.length > 0) && (
          <section className="py-16 md:py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
              {category.specs.length > 0 && (
                <div className={category.applications.length ? '' : 'lg:col-span-2'}>
                  <h2 className="aloevera-bold text-3xl text-[#1a1b4b] mb-6">Technical specifications</h2>
                  <div className="rounded-2xl border border-gray-200 overflow-hidden">
                    <table className="w-full font-lato text-sm">
                      <tbody>
                        {category.specs.map(({ label, value }, i) => (
                          <tr key={`${label}-${i}`} className={i % 2 ? 'bg-white' : 'bg-gray-50'}>
                            <th scope="row" className="text-left font-semibold text-[#1a1b4b] px-5 py-3.5 w-1/2">
                              {label}
                            </th>
                            <td className="px-5 py-3.5 text-gray-700">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {category.applications.length > 0 && (
                <div className={category.specs.length ? '' : 'lg:col-span-2'}>
                  <h2 className="aloevera-bold text-3xl text-[#1a1b4b] mb-6">Applications</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {category.applications.map((a, i) => (
                      <li
                        key={`${a}-${i}`}
                        className="flex items-center gap-3 font-lato text-[15px] text-gray-700 px-4 py-3 rounded-xl bg-gray-50"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#C83C64] shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Local section (location pages only) */}
        {hasLocal && (
          <section className="py-16 px-4 md:px-8 bg-stone-100">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h2 className="aloevera-bold text-3xl text-[#1a1b4b] mb-5">
                  {category.name} for {location.name}&rsquo;s climate
                </h2>
                {location.builtDescription && (
                  <p className="font-lato text-gray-700 leading-relaxed text-[16px] mb-6 whitespace-pre-line">
                    {location.builtDescription}
                  </p>
                )}
                {location.areas.length > 0 && (
                  <>
                    <h3 className="font-lato font-bold text-lg text-[#1a1b4b] mb-3">Areas we deliver to</h3>
                    <ul className="flex flex-wrap gap-2">
                      {location.areas.map((area) => (
                        <li
                          key={area}
                          className="flex items-center gap-1.5 font-lato text-sm font-semibold px-3 py-1.5 rounded-full bg-white border border-pink-100 text-[#1a1b4b]"
                        >
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
              )}
            </div>
          </section>
        )}

        {/* FAQs (dashboard: the category's SEO tab) */}
        <BottomContent html={seo?.bottom_content} />
        <FaqSection faqs={faqs} />

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
        {related.length > 0 && (
          <section className="py-16 md:py-20 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
              {(category.relatedTitle || (category.relatedLabel && category.relatedLink)) && (
                <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                  {category.relatedTitle && (
                    <h2 className="aloevera-bold text-3xl md:text-4xl text-[#1a1b4b]">{category.relatedTitle}</h2>
                  )}
                  {category.relatedLabel && category.relatedLink && (
                    <Link
                      href={category.relatedLink}
                      className="font-lato font-semibold text-[#C83C64] flex items-center gap-2 hover:underline"
                    >
                      {category.relatedLabel} <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {related.map((c) => (
                  <ProductCategoryCard key={c.slug} category={c} href={categoryPath(c, location)} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-4 md:px-8 pb-20">
          <div className="max-w-5xl mx-auto rounded-3xl bg-[#1a1b4b] px-6 py-12 md:p-14 text-center">
            <h2 className="aloevera-bold text-white text-3xl md:text-4xl mb-4">
              Need {category.name.toLowerCase()}
              {where}?
            </h2>
            <p className="font-lato text-white/80 max-w-xl mx-auto mb-8">
              Tell us about your project and our team will share pricing, colour options and delivery timelines.
            </p>
            <LocationQuoteButton productName={quoteName} label="Request a Quote" />
          </div>
        </section>
      </main>
    </AltTextProvider>
  );
}

/** Card used on the listing pages and in "Related categories". */
export function ProductCategoryCard({ category, href }) {
  return (
    <Link
      href={href || `/${category.slug}`}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        {category.bannerImage && (
          <Image
            src={category.bannerImage}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized={unoptimized(category.bannerImage)}
          />
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="aloevera-bold text-2xl text-[#1a1b4b] mb-2">{category.name}</h3>
        {category.description && (
          <p className="font-lato text-gray-600 text-[14px] leading-relaxed line-clamp-3 mb-5">{category.description}</p>
        )}
        <span className="mt-auto flex items-center gap-2 font-lato font-semibold text-[#C83C64]">
          View details <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
