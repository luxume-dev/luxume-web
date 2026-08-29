import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { blogsQuery } from '@/lib/queries';
import BlogHeroSection from '@/components/blog/BlogHeroSection';
import BlogSection from '@/components/blog/BlogSection';

export const revalidate = 3600;

export const metadata = {
  title: 'Insights & Updates',
  description: 'Stay informed with expert knowledge on roofing solutions, product innovations, industry trends, and professional guidance for all your steel roofing needs.',
  alternates: { canonical: '/blog' },
};

export default async function BlogPage() {
  const queryClient = await prefetch(getQueryClient(), [blogsQuery()]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <BlogHeroSection />
        <BlogSection />
      </main>
    </HydrationBoundary>
  );
}
