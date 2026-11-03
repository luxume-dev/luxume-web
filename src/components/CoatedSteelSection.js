'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useAltLookup } from '@/providers/AltTextProvider';
import { parseHtml } from '@/lib/parseHtml';

// coated_steel_images / coated_steel_img_label are text columns holding JSON
// arrays that line up by index. Also accepts an already-parsed array or a plain string.
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

const toggleStyle = (active) => active ? {
  color: '#E91E63',
  boxShadow: '0 0 0 2px #E91E63',
  background: '#FFFFFF',
  borderRadius: '30px',
  height: '100%'
} : {
  color: '#9CA3AF',
  background: 'transparent',
  borderRadius: '30px',
  height: '100%'
};

// All content comes from the dashboard (home_page coated_steel_* fields), on
// the home page and on product pages. There are no static fallbacks: an empty
// field hides its element, and the section is skipped when everything is
// empty. The title is navy; text wrapped in <span>...</span> is pink
// (#C83C64). Newlines in it are kept.
export default function CoatedSteelSection({
  isColorsAvailable = true,
  label = '',
  title = '',
  description = '',
  images,
  imageLabels,
}) {
  const getAlt = useAltLookup();
  const imageRef = useRef(null);

  // Dashboard slots without an image are skipped (slot 0 = English, 1 = Malayalam)
  const labelList = parseList(imageLabels);
  const dashboardImages = parseList(images)
    .map((src, i) => {
      const imageLabel = labelList[i]?.trim() ?? '';
      const alt = imageLabel ? `Coated Steel Layers Diagram (${imageLabel})` : 'Coated Steel Layers Diagram';
      return { src: src.trim(), label: imageLabel, alt };
    })
    .filter((item) => item.src);
  const diagrams = dashboardImages;
  const hasText = Boolean(label || title || description);

  const [activeIndex, setActiveIndex] = useState(0);
  const currentIndex = Math.min(activeIndex, diagrams.length - 1);
  const current = diagrams[currentIndex] ?? null;


  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [current?.src]);

  if (!isColorsAvailable || (!hasText && !current)) return null;

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">

        {/* Understanding Layers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20 md:mb-24">
          {/* Left Content */}
          {hasText && (
          <div className="flex flex-col justify-center">
            {label && (
            <p
              className="text-sm sm:text-base font-medium mb-2 sm:mb-3 text-center lg:text-left"
              style={{ color: '#E91E63' }}
            >
              {label}
            </p>
            )}
            {title && (
            <h2 className="aloevera-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-tight mb-4 sm:mb-6 text-center lg:text-left whitespace-pre-line text-[#1C1E54] [&_span]:text-[#C83C64]">
              {parseHtml(title)}
            </h2>
            )}
            {description && (
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 text-center lg:text-left whitespace-pre-line">
              {description}
            </p>
            )}
          </div>
          )}

          {/* Right Content - Diagram */}
          {current && (
          <div className={`flex flex-col items-center justify-center${hasText ? '' : ' lg:col-span-2'}`}>
            {/* Box Container for Image and Buttons */}
            <div
              className="w-full max-w-md lg:max-w-lg p-6 sm:p-8 rounded-2xl"
              style={{
                border: '1px solid #E5E5E5',
                background: '#FFFFFF'
              }}
            >
              {/* Diagram Image */}
              <div className={`${diagrams.length > 1 ? 'mb-6 ' : ''}relative rounded-xl overflow-hidden`} style={{ aspectRatio: '1235/1280' }}>
                <img
                  ref={imageRef}
                  src={current.src}
                  alt={getAlt(current.src, current.alt)}
                  loading="lazy"
                  decoding="async"
                  width={1235}
                  height={1280}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Language Toggle - Pill Style (only when there is more than one image) */}
              {diagrams.length > 1 && (
              <div
                className="flex"
                style={{
                  height: '40px',
                  borderRadius: '30px',
                  border: '1px solid #E5E5E5',
                  background: '#FFFFFF',
                  padding: '2px',
                  gap: '10px'
                }}
              >
                {diagrams.map((item, i) => (
                  <button
                    key={`${i}-${item.src}`}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    aria-pressed={i === currentIndex}
                    className="flex-1 text-sm sm:text-base font-medium transition-all duration-300"
                    style={toggleStyle(i === currentIndex)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              )}
            </div>
          </div>
          )}
        </div>

      </div>
    </section>
  );
}
