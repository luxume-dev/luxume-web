import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { careersQuery } from '@/lib/queries';
import CareersHeroSection from '@/components/careers/CareersHeroSection';
import JobOpeningsSection from '@/components/careers/JobOpeningsSection';

export const revalidate = 3600;

export const metadata = {
  title: 'Careers',
  description:
    'Join the Luxume Roofing team. Explore current openings across manufacturing, sales, and operations, and build your career in premium steel roofing.',
  alternates: { canonical: '/careers' },
};

export default async function CareersPage() {
  const queryClient = await prefetch(getQueryClient(), [careersQuery()]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <CareersHeroSection />
        <JobOpeningsSection />
      </main>
    </HydrationBoundary>
  );
}
