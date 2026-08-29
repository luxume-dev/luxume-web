import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { careerQuery } from '@/lib/queries';
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
  const queryClient = await prefetch(getQueryClient(), [careerQuery(id)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JobDetailClient />
    </HydrationBoundary>
  );
}
