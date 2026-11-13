import ProductsIntro from '@/components/ProductsIntro';
import ProductStats from '@/components/ProductStats';
import ProductGrid from '@/components/ProductGrid';
import ProductHero from '@/components/ProductHero';
import FaqSection from '@/components/FaqSection';
import BottomContent from '@/components/BottomContent';
import AltTextProvider from '@/providers/AltTextProvider';
import { getProductPageContent } from '@/services/supabase';
import { getProductPageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import { itemListSchema } from '@/lib/schema';
import { productsQuery } from '@/lib/queries';
import { summarise } from '@/lib/text';

export const revalidate = 10;

// SEO is managed from the dashboard (product_page -> page_seo)
export async function generateMetadata() {
  return {
    ...buildSeoMetadata(await getProductPageSeoCached(), { path: '/products' }),
    alternates: { canonical: '/products' },
  };
}

/** Brands in the order ProductGrid shows them; [] on failure (the page renders without the ItemList). */
async function getBrands() {
  try {
    return (await productsQuery().queryFn()) ?? [];
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  // None of these throw: a failure renders the page without the dashboard content / SEO extras
  const [{ data }, seo, brands] = await Promise.all([getProductPageContent(), getProductPageSeoCached(), getBrands()]);

  const itemList = itemListSchema({
    name: seo?.meta_title?.trim() || data?.title?.trim() || 'Products',
    description: seo?.meta_description?.trim() || summarise(data?.product_description),
    path: '/products',
    items: brands.filter((b) => b.slug).map((b) => ({ name: b.title, path: `/products/${b.slug}` })),
  });

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      <main className="min-h-screen bg-white">
        {itemList && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(itemList) }} />
        )}
        {seo?.schema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
        )}
        {faqSchema && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
        )}

        {/* Hero, intro and count cards come from product_page (dashboard) */}
        <ProductHero heading={data?.title?.trim()} backgroundImage={data?.banner_image?.trim()} />
        <ProductsIntro
          label={data?.product_label?.trim()}
          title={data?.product_title?.trim()}
          description={data?.product_description?.trim()}
        />
        <ProductStats cards={data?.count_card} />
        {/* Product cards come from the brands table */}
        <ProductGrid />
        <BottomContent html={seo?.bottom_content} />
        <FaqSection faqs={faqs} />
      </main>
    </AltTextProvider>
  );
}
