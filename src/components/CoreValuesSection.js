'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parseHtml } from '@/lib/parseHtml';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Card colours and icon animations cycle by position, so any number of cards
// added in the dashboard keeps the original look.
const CARD_STYLES = [
  { color: '#C83C64', animation: 'spin-slow' },
  { color: '#10B981', animation: 'sway' },
  { color: '#3B82F6', animation: 'shield-pulse' },
  { color: '#F59E0B', animation: 'bounce-subtle' },
  { color: '#8B5CF6', animation: 'glow-pulse' },
  { color: '#EC4899', animation: 'heartbeat' },
];

// The card columns are text columns holding JSON arrays that line up by index.
// Also accepts an already-parsed array or a plain string.
function parseList(value) {
  if (Array.isArray(value)) return value.map((v) => String(v ?? ''));
  if (typeof value !== 'string' || value.trim() === '') return [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed)) return parsed.map((v) => String(v ?? ''));
  } catch {
    // not JSON: a single plain value
  }
  return [value];
}

// An icon is either pasted SVG markup or the URL of an uploaded file. SVG is
// shown through an <img> data URI rather than injected into the page, so any
// script or event handler inside it can never run. "currentColor" is swapped
// for the card colour, and xmlns (required by <img>) is added when missing.
function iconSrc(icon, color) {
  if (!icon) return '';
  if (!icon.startsWith('<')) return icon;
  if (!/<svg\b/i.test(icon)) return '';
  let svg = icon.replace(/currentColor/gi, color);
  if (!/<svg\b[^>]*\bxmlns\s*=/i.test(svg)) {
    svg = svg.replace(/<svg\b/i, '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

// All content comes from the dashboard (home_page core_value_* fields).
// There are no static fallbacks: empty fields are hidden, and the whole
// section is skipped when there is no title, description or card.
export default function CoreValuesSection({
  title = '',
  description = '',
  cardTitles,
  cardDescriptions,
  icons,
}) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);
  const iconRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const titleList = parseList(cardTitles);
  const descriptionList = parseList(cardDescriptions);
  const iconList = parseList(icons);
  const count = Math.max(titleList.length, descriptionList.length, iconList.length);
  const values = Array.from({ length: count }, (_, i) => ({
    title: (titleList[i] ?? '').trim(),
    description: (descriptionList[i] ?? '').trim(),
    icon: (iconList[i] ?? '').trim(),
  }))
    .filter((card) => card.title || card.description || card.icon)
    .map((card, i) => {
      const style = CARD_STYLES[i % CARD_STYLES.length];
      return { ...card, ...style, src: iconSrc(card.icon, style.color) };
    });
  const isEmpty = !title && !description && values.length === 0;

  // Handle hover — gradient border sweep + icon spin
  const handleHover = useCallback((index) => {
    setHoveredIndex(index);
    const icon = iconRefs.current[index];
    if (icon) {
      gsap.to(icon, { rotate: 360, duration: 0.6, ease: 'power2.inOut' });
    }
  }, []);

  const handleLeave = useCallback((index) => {
    setHoveredIndex(null);
    const icon = iconRefs.current[index];
    if (icon) {
      gsap.to(icon, { rotate: 0, duration: 0.4, ease: 'power2.out' });
    }
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const header = headingRef.current || subtitleRef.current;

      // Heading — slide in from left with clip reveal
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, x: -60, clipPath: 'inset(0 100% 0 0)' },
          {
            opacity: 1, x: 0,
            clipPath: 'inset(0 0% 0 0)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headingRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      // Subtitle — typewriter-like fade from right
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1, x: 0,
            duration: 0.9,
            delay: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 85%',
              toggleActions: 'play none none none',
            }
          }
        );
      }

      const grid = sectionRef.current.querySelector('.values-grid');
      if (!grid) return;

      // Cards — horizontal slide-in from alternating sides
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const fromLeft = index % 2 === 0;

        gsap.fromTo(card,
          { opacity: 0, x: fromLeft ? -80 : 80, rotateY: fromLeft ? -10 : 10 },
          {
            opacity: 1, x: 0, rotateY: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 82%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // Icons — scale-in pop
      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;

        gsap.fromTo(icon,
          { scale: 0.3, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.6,
            delay: 0.2 + index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: grid,
              start: 'top 82%',
              toggleActions: 'play none none none',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isEmpty]);

  if (isEmpty) return null;

  return (
    <section
      ref={sectionRef}
      className="relative py-12 sm:py-16 md:py-20 lg:py-24"
      style={{
        backgroundImage: 'url(/images/roof.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay with gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 10, 30, 0.93) 0%, rgba(15, 15, 40, 0.90) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        {(title || description) && (
          <div className="mb-8 sm:mb-10 md:mb-12 text-center sm:text-left">
            {title && (
              <h2
                ref={headingRef}
                className="aloevera-bold text-3xl sm:text-4xl md:text-5xl lg:text-4xl mb-3 sm:mb-4 whitespace-pre-line"
                style={{
                  color: '#D46D64',
                  opacity: 0
                }}
              >
                {parseHtml(title)}
              </h2>
            )}
            {description && (
              <p
                ref={subtitleRef}
                className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto sm:mx-0 whitespace-pre-line"
                style={{ opacity: 0 }}
              >
                {parseHtml(description)}
              </p>
            )}
          </div>
        )}

        {/* Values Grid */}
        {values.length > 0 && (
          <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {values.map((value, index) => (
              // GSAP animates this outer div
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                className="h-full"
                style={{ opacity: 0, perspective: '800px' }}
              >
                {/* Inner card handles hover effects */}
                <div
                  className="group h-full p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl cursor-pointer flex flex-col"
                  style={{
                    background: hoveredIndex === index ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.025)',
                    border: hoveredIndex === index ? `1px solid ${value.color}30` : '1px solid rgba(255, 255, 255, 0.06)',
                    boxShadow: hoveredIndex === index
                      ? `0 0 20px ${value.color}30, inset 0 1px 0 ${value.color}20`
                      : 'none',
                    transform: hoveredIndex === index ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    backdropFilter: hoveredIndex === index ? 'blur(12px)' : 'blur(0px)',
                  }}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={() => handleLeave(index)}
                >
                  {/* Icon */}
                  {value.src && (
                    <div
                      ref={el => iconRefs.current[index] = el}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 icon-${value.animation}`}
                      style={{
                        background: `linear-gradient(135deg, ${value.color}20 0%, ${value.color}40 100%)`,
                        border: `1px solid ${value.color}50`
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={value.src}
                        alt=""
                        aria-hidden="true"
                        className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Title */}
                  {value.title && (
                    <h3
                      className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3"
                      style={{ color: value.color }}
                    >
                      {parseHtml(value.title)}
                    </h3>
                  )}

                  {/* Description */}
                  {value.description && (
                    <p className="text-gray-400 leading-relaxed text-white flex-grow whitespace-pre-line" style={{ fontSize: '16px' }}>
                      {parseHtml(value.description)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
