'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { iconSrc } from '@/lib/cmsList';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// "15 +" / "1000+" count up from 0 to the number, keeping the text after it.
// Anything else (e.g. "24/7") is shown as-is.
function toStat(card, index) {
  const title = String(card?.title ?? '').trim();
  const match = title.match(/^(\d+)(\D*)$/);
  return {
    id: index,
    src: iconSrc(String(card?.icon ?? '').trim(), 'white'),
    value: title,
    label: String(card?.label ?? '').trim(),
    isStatic: !match,
    targetNumber: match ? Number(match[1]) : 0,
    suffix: match ? match[2] : '',
  };
}

export default function ProductStats({ cards }) {
  const statsContainerRef = useRef(null);
  const statRefs = useRef([]);
  const stats = (Array.isArray(cards) ? cards : [])
    .map(toStat)
    .filter((s) => s.src || s.value || s.label);

  // Real figures in the server-rendered HTML; the scroll animation still
  // counts up from 0 on its first tick.
  const [animatedValues, setAnimatedValues] = useState(() => stats.map((s) => s.value));

  useEffect(() => {
    if (!statsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Stat cards fade-up animation with stagger
      gsap.fromTo(statRefs.current,
        {
          opacity: 0,
          y: 40,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsContainerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            onEnter: () => {
              // Trigger counter animation for non-static stats
              stats.forEach((stat, index) => {
                if (!stat.isStatic) {
                  const obj = { val: 0 };
                  gsap.to(obj, {
                    val: stat.targetNumber,
                    duration: 2,
                    delay: index * 0.15,
                    ease: 'power2.out',
                    onUpdate: () => {
                      const currentVal = Math.round(obj.val);
                      setAnimatedValues(prev => {
                        const newValues = [...prev];
                        newValues[index] = `${currentVal}${stat.suffix || ''}`;
                        return newValues;
                      });
                    }
                  });
                }
              });
            }
          }
        }
      );
    }, statsContainerRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  if (!stats.length) return null;

  return (
    <section className="w-full pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div ref={statsContainerRef} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={stat.id}
              ref={el => statRefs.current[index] = el}
              className="rounded-2xl px-8 py-12 flex flex-col items-center justify-center text-center text-white transition-transform hover:-translate-y-1 duration-300 w-full max-w-[340px] mx-auto"
              style={{ 
                background: 'linear-gradient(180deg, #C83C64 0%, #D46D64 100%)',
                boxShadow: '0 10px 30px -10px rgba(200, 60, 100, 0.3)'
              }}
            >
              {stat.src && (
                <div className="mb-4 transform scale-125">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={stat.src} alt="" aria-hidden="true" className="w-12 h-12 object-contain" />
                </div>
              )}
              <h2 className="text-[32px] font-medium mb-2 font-lato">
                {stat.isStatic ? stat.value : animatedValues[index]}
              </h2>
              <p className="text-[14px] font-normal font-lato opacity-90">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
