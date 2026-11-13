import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { blogsQuery } from '@/lib/queries';
import { getBlogPageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import { getBlogPageContent } from '@/services/supabase';
import AltTextProvider from '@/providers/AltTextProvider';
import BlogHeroSection from '@/components/blog/BlogHeroSection';
import BlogSection from '@/components/blog/BlogSection';
import FaqSection from '@/components/FaqSection';
import BottomContent from '@/components/BottomContent';

export const revalidate = 10;

const DEFAULT_METADATA = {
  title: 'Insights & Updates',
  description: 'Stay informed with expert knowledge on roofing solutions, product innovations, industry trends, and professional guidance for all your steel roofing needs.',
};

// SEO is managed from the dashboard (blog_page -> page_seo); empty fields keep these defaults.
export async function generateMetadata() {
  const seo = buildSeoMetadata(await getBlogPageSeoCached(), { path: '/blog' });
  return { ...DEFAULT_METADATA, ...seo, alternates: { canonical: '/blog' } };
}

export default async function BlogPage() {
  // None of these throw: a failure falls back to client fetching / the default hero / no SEO extras
  const [queryClient, { data: heading }, seo] = await Promise.all([
    prefetch(getQueryClient(), [blogsQuery()]),
    getBlogPageContent(),
    getBlogPageSeoCached(),
  ]);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  // Hero comes from blog_page (dashboard); empty fields use the defaults
  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <main>
          {seo?.schema && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
          )}
          {faqSchema && (
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
          )}

          <BlogHeroSection
            title={heading?.title?.trim()}
            description={heading?.description?.trim()}
            bannerImage={heading?.banner_image?.trim()}
          />
          <BlogSection />
          <BottomContent html={seo?.bottom_content} />
          <FaqSection faqs={faqs} />
        </main>
      </HydrationBoundary>
    </AltTextProvider>
  );
}
