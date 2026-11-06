import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { productQuery } from '@/lib/queries';
import { brandMissing } from '@/lib/exists.server';
import { getBrandSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import AltTextProvider from '@/providers/AltTextProvider';
import FaqSection from '@/components/FaqSection';
import { productSchema, breadcrumbSchema } from '@/lib/schema';
import ProductDetailClient from '@/components/products/ProductDetailClient';
import { getHomeContent, getProductPageContent } from '@/services/supabase';

export const revalidate = 10;

/** The route param is named `id` but carries the brand slug. */
async function getBrand(slug) {
  try {
    return await productQuery(slug).queryFn();
  } catch {
    return null;
  }
}

// SEO is managed per brand in the dashboard (brands.product_id -> page_seo).
// The brand title is only the base page title until a meta title is set there.
export async function generateMetadata({ params }) {
  const { id: slug } = await params;
  const [brand, seo] = await Promise.all([getBrand(slug), getBrandSeoCached(slug)]);

  return {
    ...(brand ? { title: brand.title } : {}),
    ...buildSeoMetadata(seo, { path: `/products/${slug}` }),
    alternates: { canonical: `/products/${slug}` },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id: slug } = await params;

  // Serve a real 404 for records that do not exist, instead of a 200
  // shell that search engines would treat as a soft 404.
  if (await brandMissing(slug)) notFound();

  // The Coated Steel Layers section is edited once, on the dashboard's home page
  // The default contact banner is edited on the dashboard's Products page
  const [queryClient, { data: homeContent }, seo, { data: productPage }] = await Promise.all([
    prefetch(getQueryClient(), [productQuery(slug)]),
    getHomeContent(),
    getBrandSeoCached(slug),
    getProductPageContent(),
  ]);
  const defaultCta = {
    title: productPage?.cta_title?.trim() || '',
    description: productPage?.cta_description?.trim() || '',
    image: productPage?.cta_image?.trim() || '',
    buttonLabel: productPage?.cta_button_label?.trim() || '',
    buttonLink: productPage?.cta_button_link?.trim() || '',
  };
  const defaultDownloads = {
    title: productPage?.download_title?.trim() || '',
    description: productPage?.download_description?.trim() || '',
    brochureLabel: productPage?.brochure_label?.trim() || '',
    brochureUrl: productPage?.brochure_url?.trim() || '',
    buttons: Array.isArray(productPage?.download_buttons) ? productPage.download_buttons : [],
  };
  const coatedSteel = {
    label: homeContent?.coated_steel_label?.trim(),
    title: homeContent?.coated_steel_title?.trim(),
    description: homeContent?.coated_steel_description?.trim(),
    images: homeContent?.coated_steel_images,
    imageLabels: homeContent?.coated_steel_img_label,
  };

  // Read back from the prefetched cache rather than refetching.
  const brand = queryClient.getQueryData(productQuery(slug).queryKey);
  const product = productSchema(brand);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: brand?.title ?? 'Product', path: `/products/${slug}` },
  ]);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      {product && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
        />
      )}
      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
      )}
      {seo?.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailClient coatedSteel={coatedSteel} defaultCta={defaultCta} defaultDownloads={defaultDownloads} />
      </HydrationBoundary>
      <FaqSection faqs={faqs} />
    </AltTextProvider>
  );
}
