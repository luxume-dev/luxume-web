'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar color change trigger - when About section touches navbar bottom
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 64px', // When top of About section hits navbar bottom (navbar height ~64px)
        end: 'bottom top',
        onEnter: () => {
          window.dispatchEvent(new CustomEvent('aboutReachedTop', { detail: { reached: true } }));
        },
        onLeaveBack: () => {
          window.dispatchEvent(new CustomEvent('aboutReachedTop', { detail: { reached: false } }));
        }
      });

      // Content animations (triggered when section is visible)
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate decorative line (keep as is — already unique)
      contentTl.fromTo(lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      // Heading — letter-stagger reveal
      const headingEl = headingRef.current;
      if (headingEl) {
        // Wrap each word's text in spans for animation
        const spans = headingEl.querySelectorAll('span');
        spans.forEach(span => {
          const text = span.textContent;
          const words = text.trim().split(/(\s+)/);
          span.innerHTML = words.map(segment => {
            // Preserve whitespace segments as-is
            if (/^\s+$/.test(segment)) return segment;
            // Wrap each word in a whitespace-nowrap inline-block so the browser
            // line-breaks between words, not between individual character spans
            const chars = segment.split('').map(char =>
              `<span class="inline-block" style="opacity:0;transform:translateY(20px) rotateX(40deg)">${char}</span>`
            ).join('');
            return `<span class="inline-block whitespace-nowrap">${chars}</span>`;
          }).join('');
        });

        const chars = headingEl.querySelectorAll('.inline-block');
        contentTl.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.04,
          stagger: 0.03,
          ease: 'power2.out',
        }, '-=0.2');
      }

      // Description — blur-to-sharp fade
      contentTl.fromTo(descriptionRef.current,
        { opacity: 0, filter: 'blur(8px)', y: 15 },
        { 
          opacity: 1, 
          filter: 'blur(0px)',
          y: 0, 
          duration: 1, 
          ease: 'power2.out'
        },
        '-=0.3'
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative z-20 bg-white py-6 px-4 sm:px-6 md:px-8 w-full"
    >
      <div className="mx-auto flex flex-col items-center text-center w-full">

        {/* Decorative Line */}
        <div 
          ref={lineRef}
          className="w-16 sm:w-20 h-1 rounded-full mb-4 origin-center"
          style={{ 
            background: 'linear-gradient(90deg, #C83C64 0%, #E91E63 100%)',
            opacity: 0
          }}
        />

        {/* Heading */}
        <h2 
          ref={headingRef}
          className="mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight"
          style={{ perspective: '600px' }}
        >
          <span className="aloevera-bold text-[#C83C64]">
            Secure &amp; Stylish
          </span>
          <span className="aloevera-bold text-[#1a1a4e]">
            {" "}: The Smart Home Shield
          </span>
        </h2>

        {/* Description */}
        <p 
          ref={descriptionRef}
          className="max-w-4xl text-sm sm:text-[15px] leading-7 sm:leading-8 text-[#666666] text-center px-2 sm:px-4"
          style={{ opacity: 0 }}
        >
          Luxume head quartered at Chittoor Road, Ernakulam is a leading manufacturer
          of colour-coated steel sheets which is primarily supplied to the construction
          industry. We began our operations in the year 2011. Since then, we have been
          manufacturing high-quality colour coated steel sheets that excel in durability,
          performance, and aesthetic appeal that safeguard and enhance the elevation of
          structures in which they are used. Our product is best suited for roofing,
          cladding walls, and other fabrication purposes. Profiling of sheets in multiple
          variations is a value-added service offered by Luxume. Luxume is part of a
          family business that conducts businesses in flexible packaging, steel, etc.
        </p>

      </div>
    </section>
  );
}
