import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { careerQuery } from '@/lib/queries';
import { jobMissing } from '@/lib/exists.server';
import JobDetailClient from '@/components/careers/JobDetailClient';

export const revalidate = 3600;

async function getJob(id) {
  try {
    return await careerQuery(id).queryFn();
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const job = await getJob(id);

  if (!job) {
    return { title: 'Careers', alternates: { canonical: `/careers/${id}` } };
  }

  const where = [job.department, job.location].filter(Boolean).join(', ');
  const description = where
    ? `${job.title} at Luxume Roofing — ${where}. See responsibilities, requirements and how to apply.`
    : `${job.title} at Luxume Roofing. See responsibilities, requirements and how to apply.`;

  return {
    title: job.title,
    description,
    alternates: { canonical: `/careers/${id}` },
    openGraph: { title: job.title, description, type: 'website', url: `/careers/${id}` },
  };
}

export default async function JobDetailPage({ params }) {
  const { id } = await params;

  // Serve a real 404 for records that do not exist, instead of a 200
  // shell that search engines would treat as a soft 404.
  if (await jobMissing(id)) notFound();

  const queryClient = await prefetch(getQueryClient(), [careerQuery(id)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobDetailClient />
    </HydrationBoundary>
  );
}
