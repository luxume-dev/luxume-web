'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutUsSection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image — smooth slide in from left
      gsap.fromTo(imageRef.current,
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Gentle floating animation after entrance
      gsap.to(imageRef.current, {
        y: 12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.4
      });

      // Heading — fade up from right side
      gsap.fromTo(headingRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0,
          duration: 1,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Text paragraphs — staggered smooth fade up
      textRefs.current.forEach((text, index) => {
        if (!text) return;
        gsap.fromTo(text,
          { opacity: 0, y: 25 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            delay: 0.4 + index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left - Image */}
          <div className="w-full lg:w-1/2">
            <img 
              ref={imageRef}
              src="/images/sheet.png" 
              alt="Colorful roofing sheets" 
              className="w-full h-auto"
              style={{ opacity: 0 }}
            />
          </div>

          {/* Right - Text content */}
          <div className="w-full lg:w-1/2">
            {/* About Us heading */}
            <h2 
              ref={headingRef}
              className="font-aloevera text-3xl sm:text-4xl mb-6"
              style={{ color: '#C83C64', opacity: 0 }}
            >
              About Us
            </h2>

            <p 
              ref={el => textRefs.current[0] = el}
              className="text-gray-600 text-sm sm:text-base leading-7 mb-4"
              style={{ opacity: 0 }}
            >
              Luxume head quartered at Chittoor Road, Ernakulam is a leading manufacturer of colour-coated steel sheets which is primarily supplied to the construction industry. We began our operations in the year 2011. Since then, we have been manufacturing high-quality colour coated steel sheets that excel in durability, performance, and aesthetic appeal that safeguard and enhance the elevation of structures in which they are used.
            </p>

            <p 
              ref={el => textRefs.current[1] = el}
              className="text-gray-600 text-sm sm:text-base leading-7 mb-4"
              style={{ opacity: 0 }}
            >
              Our product is best suited for roofing, cladding walls, and other fabrication purposes. Profiling of sheets in multiple variations is a value-added service offered by Luxume. Luxume is part of a family business that conducts businesses in flexible packaging, steel, etc.
            </p>

            <p 
              ref={el => textRefs.current[2] = el}
              className="text-gray-600 text-sm sm:text-base leading-7"
              style={{ opacity: 0 }}
            >
              We pride ourselves on delivering premium quality products backed by exceptional customer service. Our commitment to innovation drives us to continuously improve our manufacturing processes and product offerings to meet the evolving needs of the construction industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
