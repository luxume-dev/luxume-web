import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { projectsQuery } from '@/lib/queries';
import ProjectsPageContent from '@/components/projects/ProjectsPageContent';

export const revalidate = 3600;

export default async function ProjectsPage() {
  const queryClient = await prefetch(getQueryClient(), [projectsQuery()]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsPageContent />
    </HydrationBoundary>
  );
}
