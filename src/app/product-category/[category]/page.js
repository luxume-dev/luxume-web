import { notFound } from 'next/navigation';
import ProductCategoryDetail from '@/components/productCategories/ProductCategoryDetail';
import { summarise } from '@/lib/text';
import { productCategories, getProductCategory } from '@/data/productCategories';

// Only the categories in src/data/productCategories.js exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return productCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }) {
  const { category: slug } = await params;
  const category = getProductCategory(slug);
  if (!category) return {};

  return {
    title: `${category.name}`,
    description: summarise(category.summary),
    alternates: { canonical: `/product-category/${slug}` },
    openGraph: { images: [category.image] },
  };
}

export default async function ProductCategoryDetailPage({ params }) {
  const { category: slug } = await params;
  const category = getProductCategory(slug);
  if (!category) notFound();

  return <ProductCategoryDetail category={category} />;
}
