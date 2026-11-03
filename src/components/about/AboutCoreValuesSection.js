'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { iconSrc } from '@/lib/cmsList';
import { parseHtml } from '@/lib/parseHtml';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Dashboard cards take these colours in turn, so any number of cards keeps the look
const CARD_COLORS = ['#F59E0B', '#8B5CF6', '#EC4899', '#C83C64', '#10B981', '#3B82F6'];

// Title, description and cards come from about_page in the dashboard; anything
// left empty is simply not rendered. Each dashboard card has an SVG icon (or
// icon URL); "currentColor" in the SVG takes the card colour.
export default function AboutCoreValuesSection({ title, description, cards }) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);
  const iconRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const values = (cards ?? []).map((card, index) => {
    const color = CARD_COLORS[index % CARD_COLORS.length];
    return { ...card, color, src: iconSrc(card.icon, color) };
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading — drop from above with bounce
      if (headingRef.current) gsap.fromTo(headingRef.current,
        { opacity: 0, y: -40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Subtitle — fade up with blur
      if (subtitleRef.current) gsap.fromTo(subtitleRef.current,
        { opacity: 0, filter: 'blur(6px)', y: 15 },
        {
          opacity: 1, filter: 'blur(0px)', y: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current || subtitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Cards — zoom-in from center (scale up from small with slight spread)
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1, scale: 1,
            duration: 0.7,
            delay: index * 0.08,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current.querySelector('.values-grid'),
              start: 'top 82%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // Icons — spin in
      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;

        gsap.fromTo(icon,
          { scale: 0, rotate: -360, opacity: 0 },
          {
            scale: 1, rotate: 0, opacity: 1,
            duration: 0.7,
            delay: 0.15 + index * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current.querySelector('.values-grid'),
              start: 'top 82%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!title && !description && !values.length) return null;

  return (
    <section ref={sectionRef} className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(title || description) && (
          <div className={`text-center ${values.length ? 'mb-12 md:mb-16' : ''}`}>
            {title && (
              <h2
                ref={headingRef}
                className="aloevera-bold text-[36px] mb-4"
                style={{ color: '#C83C64', opacity: 0 }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                ref={subtitleRef}
                className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto whitespace-pre-line"
                style={{ opacity: 0 }}
              >
                {parseHtml(description)}
              </p>
            )}
          </div>
        )}

        {/* Values Grid */}
        {values.length > 0 && (
        <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="group bg-white p-6 rounded-xl cursor-pointer"
              style={{
                opacity: 0,
                border: hoveredIndex === index ? `1.5px solid ${value.color}` : '1px solid #f3f4f6',
                boxShadow: hoveredIndex === index
                  ? `0 8px 24px ${value.color}15`
                  : '0 1px 3px rgba(0,0,0,0.05)',
                transform: hoveredIndex === index ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon (optional; the box is hidden without one) */}
              {value.src && (
              <div
                ref={el => iconRefs.current[index] = el}
                className="w-14 h-14 flex items-center justify-center mb-4"
                style={{
                  backgroundColor: `${value.color}15`,
                  borderRadius: '14px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  transform: hoveredIndex === index ? 'scale(1.15) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={value.src} alt="" aria-hidden="true" className="w-8 h-8 object-contain" />
              </div>
              )}

              {/* Title with underline expand */}
              {value.title && (
                <h3
                  className="font-lato font-bold text-[24px] mb-3 relative inline-block"
                  style={{ color: value.color }}
                >
                  {value.title}
                  <span
                    className="absolute bottom-0 left-0 h-[2px] rounded-full"
                    style={{
                      backgroundColor: value.color,
                      width: hoveredIndex === index ? '100%' : '0%',
                      transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                    }}
                  />
                </h3>
              )}

              {/* Description */}
              {value.description && (
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {parseHtml(value.description)}
                </p>
              )}
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
