import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient.server';
import { projectsInfiniteQuery } from '@/lib/queries';
import { getProjectPageContent } from '@/services/supabase';
import ProjectsPageContent from '@/components/projects/ProjectsPageContent';

export const revalidate = 3600;

export default async function ProjectsPage() {
  const queryClient = getQueryClient();

  // First batch of projects is rendered on the server; "Load More" fetches the rest.
  // allSettled: a failed prefetch falls back to client-side fetching.
  const [, headingResult] = await Promise.allSettled([
    queryClient.prefetchInfiniteQuery(projectsInfiniteQuery()),
    getProjectPageContent(),
  ]);
  const heading = headingResult.status === 'fulfilled' ? headingResult.value.data : null;

  // Heading comes from project_page (dashboard); empty fields use the defaults
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsPageContent
        label={heading?.label?.trim()}
        title={heading?.title?.trim()}
        description={heading?.description?.trim()}
      />
    </HydrationBoundary>
  );
}
