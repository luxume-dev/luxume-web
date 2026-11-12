import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { careerQuery } from '@/lib/queries';
import { jobMissing } from '@/lib/exists.server';
import { breadcrumbSchema } from '@/lib/schema';
import { getCareerSeoCached } from '@/lib/pageSeo.server';
import { getCareersPageContent } from '@/services/supabase';
import { buildAltMap, buildSeoMetadata, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import AltTextProvider from '@/providers/AltTextProvider';
import JobDetailClient from '@/components/careers/JobDetailClient';
import FaqSection from '@/components/FaqSection';

export const revalidate = 10;

async function getJob(id) {
  try {
    return await careerQuery(id).queryFn();
  } catch {
    return null;
  }
}

/**
 * SEO is managed per job opening in the dashboard (careers.page_seo_id -> page_seo).
 * There are no hard-coded descriptions: without a meta title the job title is used.
 */
export async function generateMetadata({ params }) {
  const { id } = await params;
  const [job, seo] = await Promise.all([getJob(id), getCareerSeoCached(id)]);
  const canonical = `/careers/${id}`;

  if (!job) {
    return { alternates: { canonical } };
  }

  const metadata = buildSeoMetadata(seo, { path: canonical });

  return {
    title: job.title,
    ...metadata,
    openGraph: { title: job.title, type: 'website', url: canonical, ...metadata.openGraph },
    alternates: { canonical },
  };
}

export default async function JobDetailPage({ params }) {
  const { id } = await params;

  // Serve a real 404 for records that do not exist, instead of a 200
  // shell that search engines would treat as a soft 404.
  if (await jobMissing(id)) notFound();

  // None of these throw: a failure falls back to client fetching / no banner / no SEO extras
  const [queryClient, seo, { data: careersPage }] = await Promise.all([
    prefetch(getQueryClient(), [careerQuery(id)]),
    getCareerSeoCached(id),
    getCareersPageContent(),
  ]);

  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  // JobPosting is intentionally not emitted: the careers table has no
  // validThrough-equivalent column, so Google would auto-expire the posting
  // after 30 days. Add it through the dashboard schema field if needed.
  const job = queryClient.getQueryData(careerQuery(id).queryKey);
  const breadcrumbs = job?.title
    ? breadcrumbSchema([
        { name: 'Home', path: '' },
        { name: 'Careers', path: '/careers' },
        { name: job.title, path: `/careers/${id}` },
      ])
    : null;

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      )}
      {seo?.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* The job's own banner (careers.banner_image), else the Careers page banner */}
        {/* How to Apply contacts are managed on the dashboard Careers page (careers_page.apply_*) */}
        <JobDetailClient
          bannerImage={job?.banner_image?.trim() || careersPage?.banner_image?.trim()}
          apply={{
            title: careersPage?.apply_title?.trim(),
            description: careersPage?.apply_description?.trim(),
            email: careersPage?.apply_email?.trim(),
            whatsapp: careersPage?.apply_whatsapp?.trim(),
          }}
        />
      </HydrationBoundary>
      <FaqSection faqs={faqs} />
    </AltTextProvider>
  );
}
