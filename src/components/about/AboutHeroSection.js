'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useAltLookup } from '@/providers/AltTextProvider';
import { parseHtml } from '@/lib/parseHtml';

// Banner and the repeatable cards (Mission, Vision, ...) come from about_page
// in the dashboard; anything left empty is simply not rendered.
export default function AboutHeroSection({ banner, cards }) {
  const cardRefs = useRef([]);
  const getAlt = useAltLookup();

  const items = cards ?? [];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards — slide in alternately from left / right with fade and scale
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: index % 2 === 0 ? -60 : 60, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            delay: index * 0.2,
            ease: 'power3.out',
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  if (!banner && !items.length) return null;

  return (
    <section className="bg-white">
      {/* Hero Image - full width, no margins */}
      {banner && (
        <section className="relative w-full overflow-hidden" style={{ height: '730px' }}>
          <Image
            src={banner}
            alt={getAlt(banner, 'About Luxume - Premium steel roofing solutions')}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/55"></div>
        </section>
      )}

      {/* Mission & Vision Cards (overlap the banner only when there is one) */}
      {items.length > 0 && (
      <div
        className={`max-w-5xl mx-auto px-4 sm:px-8 relative z-10 ${
          banner ? '-mt-24 md:-mt-32' : 'pt-8 md:pt-12'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((card, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-500 hover:-translate-y-1"
              style={{ opacity: 0, transition: 'transform 0.4s ease, box-shadow 0.5s ease' }}
            >
              {card.title && (
                <h3 className="aloevera-medium text-center text-lg mb-4 text-[#C83C64]">{card.title}</h3>
              )}
              {card.description && (
                <p className="text-gray-600 text-sm leading-relaxed text-center whitespace-pre-line">
                  {parseHtml(card.description)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      )}

      {/* Spacer for cards below image */}
      <div className="h-4 md:h-8" />
    </section>
  );
}
