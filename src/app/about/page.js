import AboutHeroSection from '@/components/about/AboutHeroSection';
import AboutUsSection from '@/components/about/AboutUsSection';
import AboutCoreValuesSection from '@/components/about/AboutCoreValuesSection';
import HowWeWorkSection from '@/components/about/HowWeWorkSection';

export const metadata = {
  title: 'About Us',
  description:
    'Learn about Luxume Roofing — our story, our core values, and how we manufacture premium coated steel roofing built for durability and design.',
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  return (
    <main>
      <AboutHeroSection />
      <AboutUsSection />
      <AboutCoreValuesSection />
      <HowWeWorkSection />
    </main>
  );
}

