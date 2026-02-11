'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StatsSection() {
  const imageRef = useRef(null);

  const stats = [
    {
      value: '$23 Billion',
      label1: 'Annual',
      label2: 'Revenue'
    },
    {
      value: '200K+',
      label1: 'Happy Customers',
      label2: 'Across India & Abroad'
    },
    {
      value: '15+ Years',
      label1: 'Industry',
      label2: 'Experience'
    },
    {
      value: '98%',
      label1: 'Customer Rating Across',
      label2: 'Platforms'
    }
  ];

  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      // ScaleX animation: starts wider, shrinks symmetrically from both sides
      gsap.fromTo(imageRef.current,
        { 
          scaleX: 1.2, // Start at 150% width
          scaleY: 1.2,
        },
        {
          scaleX: 1, // Return to original width
          scaleY: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom', // Start animation earlier
            end: 'bottom bottom', // End when image center reaches viewport center
            scrub: 1,
            markers: false // Set to true for debugging
          },
          ease: 'none'
        }
      );
    }, imageRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white">
      {/* Stats Grid */}
      <div className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center p-2 sm:p-3">
                <h3 className="font-aloevera text-[#1a1a4e] text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2" style={{ fontWeight: 500 }}>
                  {stat.value}
                </h3>
                <p className="font-aloevera text-gray-500 text-xs sm:text-sm" style={{ fontWeight: 300 }}>{stat.label1}</p>
                <p className="font-aloevera text-gray-500 text-xs sm:text-sm" style={{ fontWeight: 300 }}>{stat.label2}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    {/* Roofing Image Banner */}
    <div className="px-4 sm:px-6 md:px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="overflow-visible">
          <img 
            ref={imageRef}
            src="/images/Rectangle 8.png" 
            alt="Steel Roofing"
            className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
          />
        </div>
      </div>
    </div>

    </section>
  );
}
