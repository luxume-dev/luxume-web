import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { projectsQuery, testimonialsQuery } from '@/lib/queries';
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
import DownloadsAndResources from '@/components/DownloadsAndResources';

export const revalidate = 3600;

export default async function Home() {
  // Featured Projects and Testimonials both fetched client-side, so the
  // homepage shipped skeletons to crawlers. Prefetch them here instead.
  const queryClient = await prefetch(getQueryClient(), [
    projectsQuery(),
    testimonialsQuery(),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <main>
      <HeroSection />

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
        <DownloadsAndResources />
      </div>
    </main>
    </HydrationBoundary>
  );
}
