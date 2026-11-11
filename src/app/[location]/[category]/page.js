import { notFound } from 'next/navigation';
import ProductCategoryDetail, { categoryHeading, categoryPath } from '@/components/productCategories/ProductCategoryDetail';
import { summarise } from '@/lib/text';
import { getProductCategorySeoCached } from '@/lib/pageSeo.server';
import { getLocations, getProductCategories } from '@/services/supabase';

// Location × product category, e.g. /kottayam/aluminium-zinc-coated-steel. Locations and
// categories come from the dashboard (tables `locations`, `product_categories`); unknown pairs are a 404.
// The banner uses the category's detail_title / detail_description ({location} -> city name).
export const revalidate = 10;

export async function generateStaticParams() {
  const [locations, categories] = await Promise.all([getLocations(), getProductCategories()]);
  return locations.flatMap((l) => categories.map((c) => ({ location: l.slug, category: c.slug })));
}

async function findPage(locSlug, catSlug) {
  const [locations, categories] = await Promise.all([getLocations(), getProductCategories()]);
  return {
    locations,
    categories,
    location: locations.find((l) => l.slug === locSlug) ?? null,
    category: categories.find((c) => c.slug === catSlug) ?? null,
  };
}

export async function generateMetadata({ params }) {
  const { location: locSlug, category: catSlug } = await params;
  const { location, category } = await findPage(locSlug, catSlug);
  if (!location || !category) return {};

  const { heading, description } = categoryHeading(category, location);
  const image = category.bannerImage;
  return {
    ...(heading && { title: heading }),
    description: summarise(description),
    alternates: { canonical: categoryPath(category, location) },
    ...(image && { openGraph: { images: [image] } }),
  };
}

export default async function LocationCategoryPage({ params }) {
  const { location: locSlug, category: catSlug } = await params;
  const { locations, categories, location, category } = await findPage(locSlug, catSlug);
  if (!location || !category) notFound();

  // FAQs and image alt text come from the category's SEO tab
  const seo = await getProductCategorySeoCached(category.slug);

  return (
    <ProductCategoryDetail
      category={category}
      location={location}
      locations={locations}
      categories={categories}
      seo={seo}
    />
  );
}
