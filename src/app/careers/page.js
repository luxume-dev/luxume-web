import CareersHeroSection from '@/components/careers/CareersHeroSection';
import JobOpeningsSection from '@/components/careers/JobOpeningsSection';

export const metadata = {
  title: 'Careers',
  description:
    'Join the Luxume Roofing team. Explore current openings across manufacturing, sales, and operations, and build your career in premium steel roofing.',
  alternates: { canonical: '/careers' },
};

export default function CareersPage() {
  return (
    <main>
      <CareersHeroSection />
      <JobOpeningsSection />
    </main>
  );
}
