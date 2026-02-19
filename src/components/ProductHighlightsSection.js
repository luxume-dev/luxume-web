'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCheck } from 'react-icons/fa';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductHighlightsSection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const highlightRefs = useRef([]);

  const highlights = [
    {
      title: 'Easy Installation',
      description: 'The installation process is quick and easy, saving time and effort.'
    },
    {
      title: 'Durable & Long-lasting',
      description: 'Built to withstand harsh weather conditions for years of reliable performance.'
    },
    {
      title: 'Cost Effective',
      description: 'Premium quality at competitive prices, maximizing value for your investment.'
    },
    {
      title: 'Eco-Friendly',
      description: 'Sustainable materials that are recyclable and environmentally responsible.'
    },
    {
      title: 'Weather Resistant',
      description: 'Excellent protection against rain, sun, and extreme temperatures.'
    },
    {
      title: 'Low Maintenance',
      description: 'Requires minimal upkeep while maintaining its pristine appearance.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Animation (Slide in from left)
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Content Header Animation (Fade in from right)
      gsap.fromTo(contentRef.current.children,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2, // Stagger title and description
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );

      // Highlights List Animation (Staggered reveal)
      gsap.fromTo(highlightRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: highlightRefs.current[0],
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{
        backgroundImage: 'url(/images/roof.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 10, 30, 0.92) 0%, rgba(10, 10, 30, 0.88) 100%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-center">
          
          {/* Left - Image */}
          <div className="flex justify-center lg:justify-start">
            <div 
              ref={imageRef}
              className="relative w-56 h-96 sm:w-64 sm:h-[28rem] md:w-72 md:h-[34rem] rounded-[300px] overflow-hidden opacity-0"
              style={{
                border: '4px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <img 
                src="/images/Group 57.png" 
                alt="Luxume Product Expert" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef}>
            {/* Header */}
            <h2 
              className="aloevera-bold text-[40px] text-white mb-4 sm:mb-6 opacity-0"
            >
              Product Highlights
            </h2>
            <p className="lato-regular text-base text-gray-300 mb-8 sm:mb-10 opacity-0">
              Our products come with a range of unique features and benefits that make them a preferred choice among architects, builders, structural engineers, designers, contractors and house owners alike. We offer long-lasting and visually appealing colour-coated steel sheets that have the following features.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-10 gap-y-10 sm:gap-y-12">
              {highlights.map((highlight, index) => (
                <div 
                  key={index} 
                  ref={el => highlightRefs.current[index] = el}
                  className="flex gap-3 sm:gap-4 opacity-0"
                >
                  {/* Checkmark Icon */}
                  <div 
                    className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="#101828" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  
                  {/* Text */}
                  <div>
                    <h3 className="aloevera-bold text-white text-2xl mb-1">
                      {highlight.title}
                    </h3>
                    <p className="lato-regular text-base text-gray-400 leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
