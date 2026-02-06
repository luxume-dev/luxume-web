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
      {/* Content wrapper that scrolls over the fixed hero */}
      <div className="relative z-10 mt-[100vh]">
        <AboutSection />
        <StatsSection />
        <CoreValuesSection />
        <CoatedSteelSection />
        <VideoSection />
        <ProductHighlightsSection />
        <TestimonialsSection />
      </div>
    </main>
  );
}

