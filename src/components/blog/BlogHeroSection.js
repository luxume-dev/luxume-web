'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function BlogHeroSection() {
  const bgRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background zoom-out reveal
      gsap.fromTo(bgRef.current,
        { scale: 1.2 },
        { scale: 1, duration: 1.8, ease: 'power2.out' }
      );

      // Heading — clip-path wipe + slide up
      gsap.fromTo(headingRef.current,
        {
          opacity: 0,
          y: 50,
          clipPath: 'inset(100% 0% 0% 0%)',
        },
        {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          delay: 0.4,
          ease: 'power3.out',
        }
      );

      // Subtitle — fade in + slide up
      gsap.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.9,
          ease: 'power2.out',
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative">
      {/* Background with dark overlay */}
      <div 
        ref={bgRef}
        className="w-full h-[350px] sm:h-[380px] md:h-[420px] bg-cover bg-center bg-no-repeat overflow-hidden relative"
        style={{
          backgroundImage: 'url(/images/blog.png)',
        }}
      >
        {/* Dark overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.9) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-start justify-center text-left px-4 sm:px-8 md:px-16 lg:px-24">
          <h1 
            ref={headingRef}
            className="aloevera-bold text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-3 md:mb-4"
            style={{ opacity: 0 }}
          >
            Luxume Insights & Updates
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-white/80 text-xs sm:text-sm md:text-base max-w-md sm:max-w-lg md:max-w-xl leading-relaxed"
            style={{ opacity: 0 }}
          >
            Stay informed with expert knowledge on roofing solutions, product innovations, industry trends, and professional guidance for all your steel roofing needs.
          </p>
        </div>
      </div>
    </section>
  );
}
