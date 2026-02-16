'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HowWeWorkSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const stepRefs = useRef([]);
  const imageRef = useRef(null);
  const bottomTextRef = useRef(null);

  const steps = [
    {
      number: '01',
      title: 'Connect With Us',
      description: 'Reach out to Luxume to share your roofing requirements. Our team will understand your project needs, application type, and quantity requirements to guide you toward the right product selection.'
    },
    {
      number: '02',
      title: 'Choose the Right Roofing Solution',
      description: 'Based on your requirements, we help you select the most suitable roofing sheets, profiles, and finishes. You\'ll receive clear product details, specifications, and a competitive quotation for review.'
    },
    {
      number: '03',
      title: 'Order & Delivery',
      description: 'Once the order is confirmed, we process it efficiently and ensure timely delivery of high-quality Luxume roofing sheets to your location, ready for installation by your preferred contractor.'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading — smooth slide in from left
      gsap.fromTo(headingRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Subtitle — smooth fade up
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Steps — smooth staggered slide-in from left
      stepRefs.current.forEach((step, index) => {
        if (!step) return;

        gsap.fromTo(step,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0,
            duration: 0.9,
            delay: 0.25 + index * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // Image — smooth slide in from right
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { opacity: 0, x: 60 },
          {
            opacity: 1, x: 0,
            duration: 1.2,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // Bottom text — smooth fade up
      if (bottomTextRef.current) {
        gsap.fromTo(bottomTextRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bottomTextRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-8 md:pt-12 pb-16 md:pb-24 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Left - Steps content */}
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h2 
              ref={headingRef}
              className="font-aloevera font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
              style={{ color: '#C83C64', opacity: 0 }}
            >
              How We Work
            </h2>

            {/* Subtitle */}
            <p 
              ref={subtitleRef}
              className="text-gray-600 text-sm sm:text-base mb-10 max-w-md"
              style={{ opacity: 0 }}
            >
              Our process is designed to be simple, transparent, and customer-focused, ensuring you get the right roofing solution with ease.
            </p>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  ref={el => stepRefs.current[index] = el}
                  className="flex gap-4 sm:gap-6"
                  style={{ opacity: 0 }}
                >
                  {/* Number */}
                  <span 
                    className="text-2xl sm:text-3xl font-light text-gray-300 flex-shrink-0 w-8"
                  >
                    {step.number}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 
                      className="font-bold text-lg sm:text-xl mb-2"
                      style={{ color: '#0F172B' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div 
            ref={imageRef}
            className="w-full lg:w-1/2"
            style={{ opacity: 0 }}
          >
            <img 
              src="/images/man.png" 
              alt="Worker installing roofing" 
              className="w-full h-auto rounded-2xl object-cover"
              style={{ maxHeight: '550px', objectPosition: 'center' }}
            />
          </div>
        </div>

        {/* Luxume Focus Paragraph - Bottom centered */}
        <p 
          ref={bottomTextRef}
          className="text-gray-600 text-sm sm:text-base text-center mt-12 max-w-2xl mx-auto"
          style={{ opacity: 0 }}
        >
          Luxume focuses on delivering premium roofing materials engineered for durability, performance, and long-term value.
        </p>
      </div>
    </section>
  );
}
