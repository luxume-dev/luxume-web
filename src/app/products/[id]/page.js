import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { productQuery } from '@/lib/queries';
import { brandMissing } from '@/lib/exists.server';
import { summarise } from '@/lib/text';
import { productSchema, breadcrumbSchema } from '@/lib/schema';
import ProductDetailClient from '@/components/products/ProductDetailClient';

export const revalidate = 3600;

/** The route param is named `id` but carries the brand slug. */
async function getBrand(slug) {
  try {
    return await productQuery(slug).queryFn();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id: slug } = await params;
  const brand = await getBrand(slug);

  if (!brand) {
    return { title: 'Product', alternates: { canonical: `/products/${slug}` } };
  }

  // brand.description runs 700-800 chars, far past what a SERP shows.
  const description =
    summarise(brand.description) ||
    `${brand.title} colour-coated steel roofing from Luxume — specifications, profiles and finishes.`;

  return {
    title: brand.title,
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title: brand.title,
      description,
      type: 'website',
      url: `/products/${slug}`,
      ...(brand.cover_image_url ? { images: [brand.cover_image_url] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { id: slug } = await params;

  // Serve a real 404 for records that do not exist, instead of a 200
  // shell that search engines would treat as a soft 404.
  if (await brandMissing(slug)) notFound();

  const queryClient = await prefetch(getQueryClient(), [productQuery(slug)]);

  // Read back from the prefetched cache rather than refetching.
  const brand = queryClient.getQueryData(productQuery(slug).queryKey);
  const product = productSchema(brand);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: brand?.title ?? 'Product', path: `/products/${slug}` },
  ]);

  return (
    <>
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetailClient />
      </HydrationBoundary>
    </>
  );
}
