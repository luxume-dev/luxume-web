'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function StatsSection() {
  const imageRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statRefs = useRef([]);
  const [animatedValues, setAnimatedValues] = useState(['$0', '0', '0', '0%']);

  const stats = [
    {
      value: '$23 Billion',
      label1: 'Annual',
      label2: 'Revenue',
      targetNumber: 23,
      prefix: '$',
      suffix: ' Billion'
    },
    {
      value: '200K+',
      label1: 'Happy Customers',
      label2: 'Across India & Abroad',
      targetNumber: 200,
      suffix: 'K+'
    },
    {
      value: '15+ Years',
      label1: 'Industry',
      label2: 'Experience',
      targetNumber: 15,
      suffix: '+ Years'
    },
    {
      value: '98%',
      label1: 'Customer Rating Across',
      label2: 'Platforms',
      targetNumber: 98,
      suffix: '%'
    }
  ];

  useEffect(() => {
    if (!imageRef.current || !statsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Image scale animation (keep — already unique scrub-based)
      gsap.fromTo(imageRef.current,
        { 
          scaleX: 1.2,
          scaleY: 1.2,
        },
        {
          scaleX: 1,
          scaleY: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1,
            markers: false
          },
          ease: 'none'
        }
      );

      // Stat cards — elastic scale-pop with bounce
      statRefs.current.forEach((stat, index) => {
        if (!stat) return;
        gsap.fromTo(stat,
          {
            opacity: 0,
            scale: 0,
            rotate: -10 + index * 5,
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.9,
            delay: index * 0.12,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              onEnter: () => {
                // Trigger counter animation
                const statData = stats[index];
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: statData.targetNumber,
                  duration: 2,
                  delay: index * 0.15,
                  ease: 'power2.out',
                  onUpdate: () => {
                    const currentVal = Math.round(obj.val);
                    setAnimatedValues(prev => {
                      const newValues = [...prev];
                      newValues[index] = `${statData.prefix || ''}${currentVal}${statData.suffix || ''}`;
                      return newValues;
                    });
                  }
                });
              }
            }
          }
        );
      });
    }, statsContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-white">
      {/* Stats Grid */}
      <div className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div ref={statsContainerRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                ref={el => statRefs.current[index] = el}
                className="flex flex-col items-center p-2 sm:p-3"
                style={{ opacity: 0 }}
              >
                <h3 className="aloevera-medium text-[#1a1a4e] text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">
                  {animatedValues[index]}
                </h3>
                <p className="aloevera-light text-gray-500 text-xs sm:text-sm">{stat.label1}</p>
                <p className="aloevera-light text-gray-500 text-xs sm:text-sm">{stat.label2}</p>
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
