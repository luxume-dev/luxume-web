'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function AboutHeroSection() {
  const missionRef = useRef(null);
  const visionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [missionRef.current, visionRef.current],
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: 'power2.out', 
          stagger: 0.25 
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white">
      {/* Hero Image - full width, no margins */}
      <section className="relative w-full overflow-hidden" style={{ height: '730px' }}>
        <Image
          src="/images/about.png"
          alt="About Luxume - Premium steel roofing solutions"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55"></div>
      </section>

      {/* Mission & Vision Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-24 md:-mt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Card */}
          <div 
            ref={missionRef}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            style={{ opacity: 0 }}
          >
            <h3 
              className="aloevera-medium text-center text-lg mb-4 text-[#C83C64]"
            >
              Mission
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              To establish Luxume as a trusted brand that fulfills customer requirements through advanced technology and strong core values. To expand our product portfolio and build a vibrant dealer network, achieving strong growth across Kerala and becoming a reputed South Indian brand within five years.
            </p>
          </div>

          {/* Vision Card */}
          <div 
            ref={visionRef}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            style={{ opacity: 0 }}
          >
            <h3 
              className="aloevera-medium text-center text-lg mb-4 text-[#C83C64]"
            >
              Vision
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              To become a responsible, reliable, and preferred brand in steel sheets and related products through consistent quality and innovation. To achieve market leadership across India by 2035 by earning long-term customer trust and industry recognition.
            </p>
          </div>
        </div>
      </div>

      {/* Spacer for cards below image */}
      <div className="h-4 md:h-8" />
    </section>
  );
}
