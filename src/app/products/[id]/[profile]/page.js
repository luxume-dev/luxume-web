import { notFound } from 'next/navigation';
import { productQuery } from '@/lib/queries';
import { slugify, summarise } from '@/lib/text';
import { breadcrumbSchema } from '@/lib/schema';
import ProfileDetailClient from '@/components/products/ProfileDetailClient';

export const revalidate = 3600;

/**
 * /products/[brand slug]/[profile slug]
 * Profiles have no slug column, so the slug is derived from the profile title.
 * Only the header (title, image, description, brand) is per profile; the rest
 * of the page is the static copy in ProfileDetailClient.
 */
async function getBrandProfile(brandSlug, profileSlug) {
  try {
    const brand = await productQuery(brandSlug).queryFn();
    const profile = (brand?.profiles || []).find((p) => slugify(p.title) === profileSlug);
    return profile ? { brand, profile } : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id: brandSlug, profile: profileSlug } = await params;
  const found = await getBrandProfile(brandSlug, profileSlug);
  if (!found) return {};

  const { brand, profile } = found;
  const path = `/products/${brandSlug}/${profileSlug}`;
  return {
    title: `${profile.title} | ${brand.title}`,
    description: summarise(profile.description),
    alternates: { canonical: path },
  };
}

export default async function BrandProfilePage({ params }) {
  const { id: brandSlug, profile: profileSlug } = await params;
  const found = await getBrandProfile(brandSlug, profileSlug);
  if (!found) notFound();

  const { brand, profile } = found;
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: brand.title, path: `/products/${brandSlug}` },
    { name: profile.title, path: `/products/${brandSlug}/${profileSlug}` },
  ]);

  return (
    <>
      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
      )}
      <ProfileDetailClient
        title={profile.title}
        brand={brand.title}
        brandHref={`/products/${brandSlug}`}
        image={profile.image_url}
        description={profile.description}
      />
    </>
  );
}
