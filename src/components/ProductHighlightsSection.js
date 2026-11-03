'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parseHtml } from '@/lib/parseHtml';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Tile accent colours cycle by position, so any number of cards added in the
// dashboard keeps the original look.
const TILE_COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#22C55E', '#6366F1', '#EC4899'];

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
// for the tile colour, and xmlns (required by <img>) is added when missing.
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

// Bento layout for any number of tiles: the first tile is wide, and the last
// tile stretches to fill its row, so the grid never ends with a gap.
// (2 columns from sm, 3 columns from lg.)
function tileLayout(index, count) {
  if (count === 1) return { className: 'sm:col-span-2 lg:col-span-3', layout: 'horizontal' };
  if (index === 0) return { className: 'sm:col-span-2', layout: 'horizontal' };
  if (index !== count - 1) return { className: '', layout: 'vertical' };

  // Tile 0 (2 cols) + tile 1 fill the first lg row; the rest go 3 per row
  const lgLeft = (count - 2) % 3;
  // Tile 0 fills the first sm row; the rest go 2 per row
  const smAlone = (count - 1) % 2 === 1;

  if (lgLeft === 1) {
    return { className: 'sm:col-span-2 lg:col-span-3', layout: 'horizontal' };
  }
  if (lgLeft === 2) {
    return { className: smAlone ? 'sm:col-span-2 lg:col-span-2' : 'lg:col-span-2', layout: 'vertical' };
  }
  return { className: smAlone ? 'sm:col-span-2 lg:col-span-1' : '', layout: 'vertical' };
}

// On phones every tile shows its hover state, since there is no hover
const MOBILE_QUERY = '(max-width: 767px)';
function subscribeMobile(callback) {
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}
function getMobile() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

// All content comes from the dashboard (home_page hlghlight_* fields).
// There are no static fallbacks: empty fields are hidden, and the whole
// section is skipped when there is no title, description or card.
export default function ProductHighlightsSection({
  title = '',
  description = '',
  cardTitles,
  cardDescriptions,
  icons,
}) {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const itemRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isMobile = useSyncExternalStore(subscribeMobile, getMobile, () => false);

  const titleList = parseList(cardTitles);
  const descriptionList = parseList(cardDescriptions);
  const iconList = parseList(icons);
  const count = Math.max(titleList.length, descriptionList.length, iconList.length);
  const highlights = Array.from({ length: count }, (_, i) => ({
    title: (titleList[i] ?? '').trim(),
    description: (descriptionList[i] ?? '').trim(),
    icon: (iconList[i] ?? '').trim(),
  }))
    .filter((item) => item.title || item.description || item.icon)
    .map((item, i) => {
      const color = TILE_COLORS[i % TILE_COLORS.length];
      return { ...item, color, src: iconSrc(item.icon, color) };
    });

  const isEmpty = !title && !description && highlights.length === 0;

  useEffect(() => {
    if (isEmpty) return;
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none none' };
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: trigger }
        );
      }
      if (descRef.current) {
        gsap.fromTo(descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power2.out', scrollTrigger: trigger }
        );
      }

      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.65, delay: 0.2 + i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', toggleActions: 'play none none none' } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [isEmpty, highlights.length]);

  if (isEmpty) return null;

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
      style={{
        backgroundImage: 'url(/images/roof.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,10,30,0.93) 0%, rgba(15,15,40,0.90) 100%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">

        {/* Centered header */}
        {(title || description) && (
          <div className={`text-center ${highlights.length > 0 ? 'mb-12 sm:mb-16' : ''}`}>
            {title && (
              <h2
                ref={headingRef}
                className="aloevera-bold text-white mb-4 text-3xl sm:text-4xl md:text-[48px] leading-tight whitespace-pre-line [&_span]:text-[#C83C64]"
                style={{ opacity: 0 }}
              >
                {parseHtml(title)}
              </h2>
            )}
            {description && (
              <p
                ref={descRef}
                className="lato-regular text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto whitespace-pre-line"
                style={{ opacity: 0 }}
              >
                {parseHtml(description)}
              </p>
            )}
          </div>
        )}

        {/* Bento mosaic grid */}
        {highlights.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" style={{ gridAutoRows: 'minmax(160px, auto)' }}>
            {highlights.map((item, index) => {
              const { className, layout } = tileLayout(index, highlights.length);
              return (
                <BentoTile
                  key={index}
                  item={item}
                  index={index}
                  tileRef={(el) => { itemRefs.current[index] = el; }}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  isMobile={isMobile}
                  className={className}
                  layout={layout}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function BentoTile({ item, index, tileRef, hoveredIndex, setHoveredIndex, isMobile, className = '', layout = 'vertical' }) {
  const isHovered = isMobile || hoveredIndex === index;

  return (
    <div
      ref={tileRef}
      className={`group cursor-default relative overflow-hidden rounded-2xl ${className}`}
      style={{
        opacity: 0,
        background: isHovered ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.025)',
        border: isHovered ? `1px solid ${item.color}30` : '1px solid rgba(255,255,255,0.06)',
        transition: 'all 0.4s cubic-bezier(0.22,1,0.36,1)',
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className={`p-5 sm:p-6 h-full flex ${layout === 'horizontal' ? 'flex-col sm:flex-row sm:items-center gap-4 sm:gap-6' : 'flex-col justify-end'} relative z-10`}>
        {item.src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className={`object-contain ${layout === 'horizontal' ? 'w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0' : 'w-6 h-6 sm:w-7 sm:h-7 mb-3'}`}
            style={{
              // At rest the icon is a faint white silhouette; on hover it shows
              // in the tile colour with a glow.
              opacity: isHovered ? 1 : 0.3,
              filter: isHovered ? `drop-shadow(0 0 12px ${item.color}50)` : 'brightness(0) invert(1)',
              transition: 'all 0.3s ease',
            }}
          />
        )}
        <div>
          {item.title && (
            <h3
              className="aloevera-bold text-lg sm:text-xl mb-1"
              style={{ color: isHovered ? item.color : 'white', transition: 'color 0.3s ease' }}
            >
              {parseHtml(item.title)}
            </h3>
          )}
          {item.description && (
            <p
              className="lato-regular text-sm leading-relaxed whitespace-pre-line"
              style={{ color: isHovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.35)', transition: 'color 0.3s ease' }}
            >
              {parseHtml(item.description)}
            </p>
          )}
        </div>
      </div>

      {/* Bottom accent sweep */}
      <div className="absolute bottom-0 left-0 h-[2px]" style={{
        background: `linear-gradient(90deg, ${item.color}, ${item.color}40)`,
        width: isHovered ? '100%' : '0%',
        transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1)',
      }} />

      {/* Corner glow on hover */}
      <div
        className="absolute top-0 left-0 w-32 h-32 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 0% 0%, ${item.color}12 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      />
    </div>
  );
}
