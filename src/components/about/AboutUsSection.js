'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAltLookup } from '@/providers/AltTextProvider';
import { parseHtml } from '@/lib/parseHtml';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Title, text and image come from about_page in the dashboard; anything left
// empty is simply not rendered. A blank line in the text starts a new paragraph.
export default function AboutUsSection({ title, description, image }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const headingRef = useRef(null);
  const textRefs = useRef([]);
  const getAlt = useAltLookup();

  const paragraphs = description
    ? description.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    : [];

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (imageRef.current) {
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
      }

      // Heading — fade up from right side
      if (headingRef.current) gsap.fromTo(headingRef.current,
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

  if (!title && !image && !paragraphs.length) return null;

  return (
    <section ref={containerRef} className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left - Image */}
          {image && (
            <div className="w-full lg:w-2/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={image}
                alt={getAlt(image, 'Colorful roofing sheets')}
                className="w-full h-auto"
                style={{ opacity: 0, transform: 'rotate(10deg)' }}
              />
            </div>
          )}

          {/* Right - Text content */}
          <div className={`w-full ${image ? 'lg:w-3/5' : ''}`}>
            {title && (
              <h1
                ref={headingRef}
                className="aloevera-bold text-[36px] mb-6"
                style={{ color: '#C83C64', opacity: 0 }}
              >
                {title}
              </h1>
            )}

            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                ref={(el) => (textRefs.current[index] = el)}
                className={`text-gray-600 text-sm sm:text-base leading-7 whitespace-pre-line ${
                  index < paragraphs.length - 1 ? 'mb-4' : ''
                }`}
                style={{ opacity: 0 }}
              >
                {parseHtml(paragraph)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
