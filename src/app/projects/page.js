import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/queryClient.server';
import { projectsInfiniteQuery } from '@/lib/queries';
import { getProjectPageSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import { getProjectPageContent } from '@/services/supabase';
import AltTextProvider from '@/providers/AltTextProvider';
import ProjectsPageContent from '@/components/projects/ProjectsPageContent';
import FaqSection from '@/components/FaqSection';

export const revalidate = 3600;

const DEFAULT_METADATA = {
  title: 'Projects',
  description:
    'See Luxume steel roofing in place — completed residential, commercial, and industrial projects showcasing our profiles, finishes, and colour range.',
};

// SEO is managed from the dashboard (project_page -> page_seo); empty fields keep these defaults.
export async function generateMetadata() {
  const seo = buildSeoMetadata(await getProjectPageSeoCached(), { path: '/projects' });
  return { ...DEFAULT_METADATA, ...seo, alternates: { canonical: '/projects' } };
}

export default async function ProjectsPage() {
  const queryClient = getQueryClient();

  // First batch of projects is rendered on the server; "Load More" fetches the rest.
  // allSettled: a failed prefetch falls back to client-side fetching.
  const [, headingResult, seoResult] = await Promise.allSettled([
    queryClient.prefetchInfiniteQuery(projectsInfiniteQuery()),
    getProjectPageContent(),
    getProjectPageSeoCached(),
  ]);
  const heading = headingResult.status === 'fulfilled' ? headingResult.value.data : null;
  const seo = seoResult.status === 'fulfilled' ? seoResult.value : null;

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  // Heading comes from project_page (dashboard); empty fields use the defaults
  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      {seo?.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProjectsPageContent
          label={heading?.label?.trim()}
          title={heading?.title?.trim()}
          description={heading?.description?.trim()}
        />
      </HydrationBoundary>
      <FaqSection faqs={faqs} />
    </AltTextProvider>
  );
}
