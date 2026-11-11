import { notFound } from 'next/navigation';
import { productQuery } from '@/lib/queries';
import { slugify, summarise } from '@/lib/text';
import { breadcrumbSchema } from '@/lib/schema';
import { profileDetailContent } from '@/lib/profileDetail';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import { getProfileSeoCached } from '@/lib/pageSeo.server';
import AltTextProvider from '@/providers/AltTextProvider';
import FaqSection from '@/components/FaqSection';
import BottomContent from '@/components/BottomContent';
import ProfileDetailClient from '@/components/products/ProfileDetailClient';

export const revalidate = 10;

/**
 * /products/[brand slug]/[profile slug]
 * Profiles have no slug column, so the slug is derived from the profile title.
 * Page content comes from the profile row (see lib/profileDetail.js); SEO, FAQs
 * and the bottom content (page_seo.bottom_content, rich-text HTML) from its page_seo row.
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
  const seo = await getProfileSeoCached(profile.id);
  const seoMetadata = buildSeoMetadata(seo, { path });
  const fallbackDescription = summarise(profile.description);
  // Without an OG image in the SEO tab, share the product image
  const shareImage = !seo?.og_image?.trim() && profile.image_url ? [profile.image_url] : null;

  return {
    title: `${profile.title} | ${brand.title}`,
    ...(fallbackDescription ? { description: fallbackDescription } : {}),
    ...seoMetadata,
    ...(seoMetadata.openGraph
      ? {
          openGraph: { ...seoMetadata.openGraph, ...(shareImage ? { images: shareImage } : {}) },
          twitter: { ...seoMetadata.twitter, ...(shareImage ? { images: shareImage } : {}) },
        }
      : {}),
    alternates: { canonical: path },
  };
}

export default async function BrandProfilePage({ params }) {
  const { id: brandSlug, profile: profileSlug } = await params;
  const found = await getBrandProfile(brandSlug, profileSlug);
  if (!found) notFound();

  const { brand, profile } = found;
  const seo = await getProfileSeoCached(profile.id);
  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Products', path: '/products' },
    { name: brand.title, path: `/products/${brandSlug}` },
    { name: profile.title, path: `/products/${brandSlug}/${profileSlug}` },
  ]);

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      )}
      {seo?.schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />}
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />}
      <ProfileDetailClient
        profile={profileDetailContent(profile)}
        brand={brand.title}
        brandHref={`/products/${brandSlug}`}
      >
        <BottomContent html={seo?.bottom_content} />
        {faqs.length > 0 && <FaqSection faqs={faqs} />}
      </ProfileDetailClient>
    </AltTextProvider>
  );
}
