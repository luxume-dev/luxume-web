'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Observer, ScrollToPlugin } from 'gsap/all';

import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import StatsSection from '@/components/StatsSection';
import CoreValuesSection from '@/components/CoreValuesSection';
import CoatedSteelSection from '@/components/CoatedSteelSection';
import VideoSection from '@/components/VideoSection';
import ProductHighlightsSection from '@/components/ProductHighlightsSection';
import TestimonialsSection from '@/components/TestimonialsSection';

gsap.registerPlugin(Observer, ScrollToPlugin);

export default function Home() {
  const containerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const observerRef = useRef(null);
  const snappedDownRef = useRef(false);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Set ready after mount to prevent initial layout shift
    setIsReady(true);

    const getSnapY = () => {
      const rect = containerRef.current.getBoundingClientRect();
      return window.scrollY + rect.top - window.innerHeight / 2;
    };

    // Check initial scroll position - if already scrolled past snap point, don't activate observer
    const initialSnapY = getSnapY();
    if (window.scrollY >= initialSnapY - 100) {
      snappedDownRef.current = true;
      // Don't create observer if we're already past the snap point
      return;
    }

    const snapDown = () => {
      if (animatingRef.current) return;

      animatingRef.current = true;
      snappedDownRef.current = true;

      gsap.to(window, {
        scrollTo: { y: getSnapY(), autoKill: false },
        duration: 0.6,
        ease: 'power1.out',
        onComplete: () => {
          animatingRef.current = false;

          // 🔑 Disable observer so normal scrolling works
          observerRef.current?.disable();
        },
      });
    };

    const snapUp = () => {
      if (animatingRef.current) return;

      animatingRef.current = true;
      snappedDownRef.current = false;

      gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: 1.2,
        ease: 'power1.out',
        onComplete: () => {
          animatingRef.current = false;

          // 🔑 Re-enable observer when back at top
          observerRef.current?.enable();
        },
      });
    };

    observerRef.current = Observer.create({
      type: 'wheel,touch',
      preventDefault: true,
      tolerance: 5,

      onDown() {
        // FIRST scroll only
        if (
          !snappedDownRef.current &&
          window.scrollY < window.innerHeight
        ) {
          snapDown();
        }
      },

      onUp() {
        // Only snap UP when user reaches snap point
        if (
          snappedDownRef.current &&
          window.scrollY <= getSnapY() + 5
        ) {
          snapUp();
        }
      },
    });

    return () => {
      observerRef.current?.kill();
    };
  }, []);

  return (
    <main>
      <HeroSection />

      <div 
        ref={containerRef} 
        className={`relative w-full mt-[100vh] ${isReady ? 'opacity-100' : 'opacity-0'}`}
      >
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
