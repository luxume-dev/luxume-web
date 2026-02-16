'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CareersHeroSection() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const btnRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background Zoom
      gsap.fromTo(bgRef.current,
        { scale: 1.1 }, // Start slightly zoomed in
        {
          scale: 1,
          duration: 2,
          ease: 'power2.out',
        }
      );

      // Content Staggered Reveal
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(titleRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, delay: 0.2 }
        )
        .fromTo(descRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(btnRef.current,
          { y: 20, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
          "-=0.4"
        );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative px-3 sm:px-4 md:px-5 pt-20 sm:pt-24 bg-white overflow-hidden">
      {/* Background Image */}
      <div 
        ref={bgRef}
        className="w-full h-[350px] sm:h-[400px] md:h-[450px] bg-cover bg-center bg-no-repeat rounded-2xl sm:rounded-3xl overflow-hidden relative transform-gpu"
        style={{
          backgroundImage: 'url(/images/luxumeteam.png)',
        }}
      >
        {/* Dark overlay */}
        <div 
          className="absolute inset-0 rounded-2xl sm:rounded-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.75) 100%)'
          }}
        />

        {/* Content */}
        <div 
          ref={contentRef}
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-8"
        >
          <h1 
            ref={titleRef}
            className="font-aloevera font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 opacity-0"
          >
            Join the<br />Luxume Team
          </h1>
          
          <p 
            ref={descRef}
            className="text-white text-sm sm:text-base max-w-md mb-6 sm:mb-8 px-4 leading-relaxed opacity-0"
          >
            Grow your career with a trusted leader in roofing solutions and industrial excellence.
          </p>

          <a
            ref={btnRef}
            href="#openings"
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded text-white text-sm sm:text-base font-medium transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95 opacity-0"
            style={{ backgroundColor: '#C83C64' }}
          >
            Explore Opportunities
          </a>
        </div>
      </div>
    </section>
  );
}
