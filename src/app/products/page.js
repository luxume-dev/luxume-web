import ProductsIntro from '@/components/ProductsIntro';
import ProductStats from '@/components/ProductStats';
import ProductGrid from '@/components/ProductGrid';
import ProductHero from '@/components/ProductHero';
import FaqSection from '@/components/FaqSection';
import AltTextProvider from '@/providers/AltTextProvider';
import { getProductPageContent } from '@/services/supabase';
import { getProductPageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';

export const revalidate = 10;

// SEO is managed from the dashboard (product_page -> page_seo)
export async function generateMetadata() {
  return {
    ...buildSeoMetadata(await getProductPageSeoCached(), { path: '/products' }),
    alternates: { canonical: '/products' },
  };
}

export default async function ProductsPage() {
  // None of these throw: a failure renders the page without the dashboard content / SEO extras
  const [{ data }, seo] = await Promise.all([getProductPageContent(), getProductPageSeoCached()]);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      <main className="min-h-screen bg-white">
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
        <FaqSection faqs={faqs} />
      </main>
    </AltTextProvider>
  );
}
