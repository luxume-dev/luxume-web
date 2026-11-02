'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useAltLookup } from '@/providers/AltTextProvider';
import { parseHtml } from '@/lib/parseHtml';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// progress_title / progress_label are text columns holding JSON arrays that
// line up by index. Also accepts an already-parsed array or a plain string.
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

// Split "50+ Million" into prefix "", number 50, suffix "+ Million" so it can
// count up. A title without a number is shown as-is with no counter.
function toStat({ title, label }) {
  const match = title.match(/^(\D*?)(\d+(?:\.\d+)?)(.*)$/s);
  return {
    value: title,
    label,
    targetNumber: match ? parseFloat(match[2]) : null,
    decimals: match?.[2].split('.')[1]?.length ?? 0,
    prefix: match?.[1] ?? '',
    suffix: match?.[3] ?? '',
  };
}

// All content comes from the dashboard (home_page progress_* fields).
// There are no static fallbacks: no items hides the stats, no image hides the
// image, and the whole section is skipped when both are empty.
export default function StatsSection({ titles, labels, image = '' }) {
  const getAlt = useAltLookup();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statRefs = useRef([]);

  const titleList = parseList(titles);
  const labelList = parseList(labels);
  const count = Math.max(titleList.length, labelList.length);
  const stats = Array.from({ length: count }, (_, i) => ({
    title: (titleList[i] ?? '').trim(),
    label: (labelList[i] ?? '').trim(),
  }))
    .filter((item) => item.title || item.label)
    .map(toStat);

  // Seeded with the real figures so they exist in server-rendered HTML —
  // crawlers and AI engines previously saw only '$0'/'0'/'0%'. The scroll
  // animation still counts up: its first onUpdate tick resets to 0.
  const [animatedValues, setAnimatedValues] = useState(() => stats.map((s) => s.value));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image scale animation (scrub-based)
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          {
            scaleX: 1.2,
            scaleY: 1.2,
          },
          {
            scaleX: 1,
            scaleY: 1,
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1,
              markers: false
            },
            ease: 'none'
          }
        );
      }

      if (!statsContainerRef.current) return;

      // Stat cards — elastic scale-pop with bounce
      statRefs.current.forEach((stat, index) => {
        if (!stat) return;
        gsap.fromTo(stat,
          {
            opacity: 0,
            scale: 0,
            rotate: -10 + index * 5,
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.9,
            delay: index * 0.12,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              onEnter: () => {
                // Trigger counter animation
                const statData = stats[index];
                if (statData.targetNumber === null) return; // no number to count
                const obj = { val: 0 };
                gsap.to(obj, {
                  val: statData.targetNumber,
                  duration: 2,
                  delay: index * 0.15,
                  ease: 'power2.out',
                  onUpdate: () => {
                    const currentVal = obj.val.toFixed(statData.decimals);
                    setAnimatedValues(prev => {
                      const newValues = [...prev];
                      newValues[index] = `${statData.prefix}${currentVal}${statData.suffix}`;
                      return newValues;
                    });
                  }
                });
              }
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
    // Content is server-provided and fixed for the page's lifetime
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (stats.length === 0 && !image) return null;

  return (
    <section ref={sectionRef} className="bg-white">
      {/* Stats Grid */}
      {stats.length > 0 && (
        <div className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Flex-wrap instead of a fixed 4-column grid so any number of items
                stays centred (2 per row on mobile, 4 per row from md). */}
            <div ref={statsContainerRef} className="flex flex-wrap justify-center gap-y-4 sm:gap-y-6 text-center">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  ref={el => statRefs.current[index] = el}
                  className="flex flex-col items-center p-2 sm:p-3 basis-1/2 md:basis-1/4"
                  style={{ opacity: 0 }}
                >
                  {stat.value && (
                    <h3 className="aloevera-medium text-[#1a1a4e] text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-1 sm:mb-2">
                      {animatedValues[index]}
                    </h3>
                  )}
                  {stat.label && (
                    <p className="aloevera-light text-gray-500 text-xs sm:text-sm whitespace-pre-line">
                      {parseHtml(stat.label)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Image Banner */}
      {image && (
        <div className={`px-4 sm:px-6 md:px-8 pb-12 ${stats.length === 0 ? 'pt-8 sm:pt-10 md:pt-12' : ''}`}>
          <div className="max-w-6xl mx-auto">
            <div className="overflow-visible">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={image}
                alt={getAlt(image, '')}
                // Below the fold: without this the browser preloads it and
                // starves the hero background, which is the LCP element.
                loading="lazy"
                decoding="async"
                width={1200}
                height={384}
                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
