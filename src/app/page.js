import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import CoreValuesSection from '@/components/CoreValuesSection';
import CoatedSteelSection from '@/components/CoatedSteelSection';
import VideoSection from '@/components/VideoSection';
import ProductHighlightsSection from '@/components/ProductHighlightsSection';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <CoreValuesSection />
      <CoatedSteelSection />
      <VideoSection />
      <ProductHighlightsSection />
      <TestimonialsSection />
    </main>
  );
}

