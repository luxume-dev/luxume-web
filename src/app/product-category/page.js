import LocationHero from '@/components/locations/LocationHero';
import FaqSection from '@/components/FaqSection';
import BottomContent from '@/components/BottomContent';
import AltTextProvider from '@/providers/AltTextProvider';
import { ProductCategoryCard } from '@/components/productCategories/ProductCategoryDetail';
import { getProductCategoryPageContent, getProductCategories } from '@/services/supabase';
import { getProductCategoryPageSeoCached } from '@/lib/pageSeo.server';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { summarise } from '@/lib/text';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';

// Banner, heading and SEO are managed from the dashboard (product_category_page -> page_seo);
// the cards are the categories under Content -> Product Categories (each links to /<slug>)
export const revalidate = 10;

// Default title / description, used only when the SEO tab leaves them empty
const DEFAULT_METADATA = {
  title: 'Roofing Sheet Categories',
  description:
    'Explore metal roofing, steel roofing, colour-coated, galvanised, Galvalume, PPGL, GI and cladding sheets from Luxume.',
};

export async function generateMetadata() {
  const seo = buildSeoMetadata(await getProductCategoryPageSeoCached(), { path: '/product-category' });
  return {
    ...DEFAULT_METADATA,
    ...seo,
    alternates: { canonical: '/product-category' },
  };
}

const text = (value) => (typeof value === 'string' ? value.trim() : '');

export default async function ProductCategoryPage() {
  // Neither throws: a failure renders the page without the dashboard content / SEO extras
  const [{ data }, seo, productCategories] = await Promise.all([
    getProductCategoryPageContent(),
    getProductCategoryPageSeoCached(),
    getProductCategories(),
  ]);
  // Empty fields hide their part of the page
  const page = {
    page_banner_image: text(data?.page_banner_image),
    label: text(data?.label),
    title: text(data?.title),
    description: text(data?.description),
    browse_title: text(data?.browse_title),
    browse_description: text(data?.browse_description),
  };
  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  const itemList = itemListSchema({
    name: text(seo?.meta_title) || page.title || DEFAULT_METADATA.title,
    description: text(seo?.meta_description) || summarise(page.description) || DEFAULT_METADATA.description,
    path: '/product-category',
    items: productCategories.map((c) => ({ name: c.name, path: `/${c.slug}` })),
  });

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Product Category', path: '/product-category' },
  ]);

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      <main className="min-h-screen bg-white">
        {itemList && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemList) }} />
        )}
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
          image={page.page_banner_image}
          eyebrow={page.label}
          heading={page.title}
          description={page.description}
          crumbs={[{ label: 'Home', href: '/' }, { label: 'Product Category' }]}
        />

        <section className="py-16 md:py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {(page.browse_title || page.browse_description) && (
              <div className="text-center mb-12">
                {page.browse_title && (
                  <h2 className="aloevera-bold text-4xl md:text-[48px] leading-tight mb-4" style={{ color: 'var(--secondary)' }}>
                    {page.browse_title}
                  </h2>
                )}
                {page.browse_description && (
                  <p
                    className="lato-regular text-[16px] max-w-2xl mx-auto leading-[28px] whitespace-pre-line"
                    style={{ color: 'var(--text-description)' }}
                  >
                    {page.browse_description}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productCategories.map((c) => (
                <ProductCategoryCard key={c.slug} category={c} />
              ))}
            </div>
          </div>
        </section>

        <BottomContent html={seo?.bottom_content} />
        <FaqSection faqs={faqs} />
      </main>
    </AltTextProvider>
  );
}
