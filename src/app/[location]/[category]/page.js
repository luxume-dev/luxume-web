import { notFound } from 'next/navigation';
import ProductCategoryDetail from '@/components/productCategories/ProductCategoryDetail';
import { summarise } from '@/lib/text';
import { locations, getLocation } from '@/data/locations';
import { productCategories, getProductCategory } from '@/data/productCategories';

// Location × product category, e.g. /ernakulam/gi-sheets. Unknown pairs are a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locations.flatMap((l) => productCategories.map((c) => ({ location: l.slug, category: c.slug })));
}

export async function generateMetadata({ params }) {
  const { location: locSlug, category: catSlug } = await params;
  const location = getLocation(locSlug);
  const category = getProductCategory(catSlug);
  if (!location || !category) return {};

  return {
    title: `${category.name} in ${location.name}`,
    description: summarise(`Buy ${category.name.toLowerCase()} in ${location.name} from Luxume. ${category.summary}`),
    alternates: { canonical: `/${locSlug}/${catSlug}` },
    openGraph: { images: [category.image] },
  };
}

export default async function LocationCategoryPage({ params }) {
  const { location: locSlug, category: catSlug } = await params;
  const location = getLocation(locSlug);
  const category = getProductCategory(catSlug);
  if (!location || !category) notFound();

  return <ProductCategoryDetail category={category} location={location} />;
}
