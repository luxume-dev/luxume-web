import BlogHeroSection from '@/components/blog/BlogHeroSection';
import BlogSection from '@/components/blog/BlogSection';

export const metadata = {
  title: 'Insights & Updates',
  description: 'Stay informed with expert knowledge on roofing solutions, product innovations, industry trends, and professional guidance for all your steel roofing needs.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return (
    <main>
      <BlogHeroSection />
      <BlogSection />
    </main>
  );
}
