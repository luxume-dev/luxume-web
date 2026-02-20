'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FaStar, FaUserCircle } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const cardRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Spotlight hover effect
  const handleMouseMove = useCallback((e, index) => {
    const card = cardRefs.current[index]?.querySelector('.testimonial-inner');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const spotX = (x / rect.width) * 100;
    const spotY = (y / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(200, 60, 100, 0.05) 0%, rgba(255,255,255,1) 50%)`;
  }, []);

  const handleMouseLeave = useCallback((index) => {
    const card = cardRefs.current[index]?.querySelector('.testimonial-inner');
    if (card) {
      card.style.background = '#FFFFFF';
    }
    setHoveredIndex(null);
  }, []);

  const testimonials = [
    {
      quote: "Luxume roofing completely transformed our home. The finish is premium, the structure feels solid, and even after heavy rains and heat, the performance is outstanding.",
      name: "Priya Menon",
      location: "Calicut",
    },
    {
      quote: "We chose Luxume for its strength and design flexibility. The installation was smooth, and the sheets deliver exactly what they promise—durability and style.",
      name: "Rajesh Kumar",
      location: "Bangalore",
    },
    {
      quote: "After using Luxume roofing sheets, we no longer worry about weather damage. The quality is unmatched, and the look adds real value to the property.",
      name: "Anjali Sharma",
      location: "Ernakulam",
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading — scale up from tiny with rotation
      gsap.fromTo(headingRef.current,
        { opacity: 0, scale: 0.8, rotateZ: -2 },
        {
          opacity: 1, scale: 1, rotateZ: 0,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Description — blur-in from right
      gsap.fromTo(descRef.current,
        { opacity: 0, x: 50, filter: 'blur(5px)' },
        {
          opacity: 1, x: 0, filter: 'blur(0px)',
          duration: 0.9,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Testimonial cards — cascade waterfall (diagonal slide)
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, x: -40 + (index * 20), y: 60, rotate: -3 + index * 2 },
          {
            opacity: 1, x: 0, y: 0, rotate: 0,
            duration: 0.9,
            delay: index * 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current.querySelector('.testimonials-grid'),
              start: 'top 82%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            ref={headingRef}
            className="aloevera-bold text-4xl sm:text-5xl md:text-[60px] mb-4"
            style={{ opacity: 0 }}
          >
            <span style={{ color: '#1C1E54' }}>Trusted by Homes</span>
            <br />
            <span style={{ color: '#C83C64' }}>That Demand Strength</span>
          </h2>
          <p ref={descRef} className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mt-4 sm:mt-6" style={{ opacity: 0 }}>
            From modern residences to large-scale projects, Luxume roofing sheets have earned the trust of customers through durability, design excellence, and long-lasting performance. Here's what our clients have to say about building with Luxume.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="h-full"
              style={{ opacity: 0 }}
            >
              <div 
                className="testimonial-inner flex flex-col bg-white p-6 sm:p-8 rounded-2xl cursor-pointer h-full"
                style={{
                  boxShadow: hoveredIndex === index 
                    ? '0 20px 40px rgba(200, 60, 100, 0.15), 0 4px 12px rgba(0,0,0,0.05)' 
                    : '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: hoveredIndex === index 
                    ? '1.5px solid #C83C64' 
                    : '1px solid #F5F5F5',
                  transform: hoveredIndex === index ? 'translateY(-4px) rotateZ(0.5deg)' : 'translateY(0) rotateZ(0deg)',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Quote Icon */}
                <div 
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4"
                  style={{ 
                    background: '#C83C64', 
                    borderRadius: '20px',
                    transform: hoveredIndex === index ? 'scale(1.1) rotate(10deg)' : 'scale(1) rotate(0deg)',
                    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 3C15.4696 3 14.9609 3.21071 14.5858 3.58579C14.2107 3.96086 14 4.46957 14 5V11C14 11.5304 14.2107 12.0391 14.5858 12.4142C14.9609 12.7893 15.4696 13 16 13C16.2652 13 16.5196 13.1054 16.7071 13.2929C16.8946 13.4804 17 13.7348 17 14V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17C14.7348 17 14.4804 17.1054 14.2929 17.2929C14.1054 17.4804 14 17.7348 14 18V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21C16.5913 21 18.1174 20.3679 19.2426 19.2426C20.3679 18.1174 21 16.5913 21 15V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V11C3 11.5304 3.21071 12.0391 3.58579 12.4142C3.96086 12.7893 4.46957 13 5 13C5.26522 13 5.51957 13.1054 5.70711 13.2929C5.89464 13.4804 6 13.7348 6 14V15C6 15.5304 5.78929 16.0391 5.41421 16.4142C5.03914 16.7893 4.53043 17 4 17C3.73478 17 3.48043 17.1054 3.29289 17.2929C3.10536 17.4804 3 17.7348 3 18V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C5.5913 21 7.11742 20.3679 8.24264 19.2426C9.36786 18.1174 10 16.5913 10 15V5C10 4.46957 9.78929 3.96086 9.41421 3.58579C9.03914 3.21071 8.53043 3 8 3H5Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      className="text-sm sm:text-base"
                      style={{
                        color: hoveredIndex === index ? '#C83C64' : '#FBBF24',
                        transition: `color 0.3s ease ${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                  &quot;{testimonial.quote}&quot;
                </p>

                {/* Divider */}
                <div 
                  className="h-1 mb-4 rounded-full"
                  style={{ 
                    background: 'linear-gradient(90deg, #C83C64, #E91E63)', 
                    width: hoveredIndex === index ? '64px' : '32px',
                    transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <FaUserCircle 
                      className="w-10 h-10 sm:w-12 sm:h-12"
                      style={{ 
                        color: hoveredIndex === index ? '#C83C64' : '#d1d5db',
                        transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                        transition: 'all 0.3s ease',
                      }}
                    />
                    {/* Verified Badge */}
                    <div 
                      className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm"
                      style={{ background: '#C83C64', border: '2px solid white' }}
                    >
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4 
                      className="font-semibold text-sm sm:text-base"
                      style={{ 
                        color: hoveredIndex === index ? '#C83C64' : '#1a1a4e',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
