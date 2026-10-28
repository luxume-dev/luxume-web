import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { projectsQuery, testimonialsQuery } from '@/lib/queries';
import { getHomePageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import AltTextProvider from '@/providers/AltTextProvider';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import CoreValuesSection from '@/components/CoreValuesSection';
import CoatedSteelSection from '@/components/CoatedSteelSection';
import ProjectsSection from '@/components/ProjectsSection';
import VideoSection from '@/components/VideoSection';
import ProductHighlightsSection from '@/components/ProductHighlightsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import AwardsSection from '@/components/AwardsSection';
import FaqSection from '@/components/FaqSection';
import DownloadsAndResources from '@/components/DownloadsAndResources';

export const revalidate = 3600;

// SEO is managed from the dashboard (home_page -> page_seo); empty fields keep the layout defaults.
export async function generateMetadata() {
  return buildSeoMetadata(await getHomePageSeoCached(), { path: '/' });
}

export default async function Home() {
  // Featured Projects and Testimonials both fetched client-side, so the
  // homepage shipped skeletons to crawlers. Prefetch them here instead.
  const [queryClient, seo] = await Promise.all([
    prefetch(getQueryClient(), [projectsQuery(), testimonialsQuery()]),
    getHomePageSeoCached(),
  ]);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <AltTextProvider alts={buildAltMap(seo)}>
    <main>
      {seo?.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}

      <HeroSection heading={seo?.head_text?.trim()} text={seo?.body_text?.trim()} />

      <div className="relative w-full mt-[100vh] bg-white">
        <AboutSection />
        <StatsSection />
        <CoreValuesSection />
        <CoatedSteelSection />
        <ProjectsSection />
        <VideoSection />
        <ProductHighlightsSection />
        <TestimonialsSection />
        <AwardsSection />
        <FaqSection faqs={faqs} />
        <DownloadsAndResources />
      </div>
    </main>
    </AltTextProvider>
    </HydrationBoundary>
  );
}
