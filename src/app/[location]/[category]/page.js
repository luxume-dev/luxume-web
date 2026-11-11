import { notFound } from 'next/navigation';
import ProductCategoryDetail from '@/components/productCategories/ProductCategoryDetail';
import { summarise } from '@/lib/text';
import { getLocations } from '@/services/supabase';
import { productCategories, getProductCategory } from '@/data/productCategories';

// Location × product category, e.g. /ernakulam/gi-sheets. Locations come from the
// dashboard (table `locations`); unknown pairs are a 404.
export const revalidate = 10;

export async function generateStaticParams() {
  const locations = await getLocations();
  return locations.flatMap((l) => productCategories.map((c) => ({ location: l.slug, category: c.slug })));
}

async function findPage(locSlug, catSlug) {
  const locations = await getLocations();
  return {
    locations,
    location: locations.find((l) => l.slug === locSlug) ?? null,
    category: getProductCategory(catSlug),
  };
}

export async function generateMetadata({ params }) {
  const { location: locSlug, category: catSlug } = await params;
  const { location, category } = await findPage(locSlug, catSlug);
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
  const { locations, location, category } = await findPage(locSlug, catSlug);
  if (!location || !category) notFound();

  return <ProductCategoryDetail category={category} location={location} locations={locations} />;
}
