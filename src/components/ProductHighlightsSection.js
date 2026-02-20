'use client';

import { useEffect, useRef, useState } from 'react';
import { FaWrench, FaShieldAlt, FaMoneyBillWave, FaLeaf, FaCloudSunRain, FaCogs } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProductHighlightsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const itemRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const highlights = [
    { icon: FaWrench, title: 'Easy Installation', description: 'Quick and effortless installation process, saving time and reducing labor costs.', color: '#F59E0B' },
    { icon: FaShieldAlt, title: 'Durable & Long-lasting', description: 'Built to withstand harsh weather for years of reliable performance.', color: '#3B82F6' },
    { icon: FaMoneyBillWave, title: 'Cost Effective', description: 'Premium quality at competitive prices, maximizing value for your investment.', color: '#10B981' },
    { icon: FaLeaf, title: 'Eco-Friendly', description: 'Sustainable, recyclable materials that minimize environmental impact.', color: '#22C55E' },
    { icon: FaCloudSunRain, title: 'Weather Resistant', description: 'Protection against rain, sun, wind, and extreme temperatures.', color: '#6366F1' },
    { icon: FaCogs, title: 'Low Maintenance', description: 'Minimal upkeep while maintaining a pristine appearance for decades.', color: '#EC4899' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none none' } }
      );
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%', toggleActions: 'play none none none' } }
      );

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
  }, []);

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
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={headingRef}
            className="aloevera-bold text-white mb-4 text-3xl sm:text-4xl md:text-[48px] leading-tight"
            style={{ opacity: 0 }}
          >
            Product <span style={{ color: '#C83C64' }}>Highlights</span>
          </h2>
          <p
            ref={descRef}
            className="lato-regular text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ opacity: 0 }}
          >
            Our products combine unique features and benefits, making them a preferred choice among architects, builders, engineers, and homeowners.
          </p>
        </div>

        {/* Bento mosaic grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" style={{ gridAutoRows: 'minmax(160px, auto)' }}>

          {/* Tile 0 — spans 2 cols */}
          <BentoTile
            item={highlights[0]}
            index={0}
            itemRefs={itemRefs}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            className="sm:col-span-2"
            layout="horizontal"
          />

          {/* Tile 1 — single */}
          <BentoTile
            item={highlights[1]}
            index={1}
            itemRefs={itemRefs}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />



          {/* Tile 2 */}
          <BentoTile
            item={highlights[2]}
            index={2}
            itemRefs={itemRefs}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />

          {/* Tile 3 */}
          <BentoTile
            item={highlights[3]}
            index={3}
            itemRefs={itemRefs}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />

          {/* Tile 4 */}
          <BentoTile
            item={highlights[4]}
            index={4}
            itemRefs={itemRefs}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />

          {/* Tile 5 — spans full width, horizontal layout */}
          <BentoTile
            item={highlights[5]}
            index={5}
            itemRefs={itemRefs}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
            className="sm:col-span-2 lg:col-span-3"
            layout="horizontal"
          />
        </div>
      </div>
    </section>
  );
}

function BentoTile({ item, index, itemRefs, hoveredIndex, setHoveredIndex, className = '', layout = 'vertical' }) {
  const isHovered = hoveredIndex === index;
  const Icon = item.icon;

  return (
    <div
      ref={el => itemRefs.current[index] = el}
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
        <Icon
          className={layout === 'horizontal' ? 'text-3xl sm:text-4xl flex-shrink-0' : 'text-2xl sm:text-3xl mb-3'}
          style={{
            color: isHovered ? item.color : 'rgba(255,255,255,0.3)',
            transition: 'all 0.3s ease',
            filter: isHovered ? `drop-shadow(0 0 12px ${item.color}50)` : 'none',
          }}
        />
        <div>
          <h3
            className="aloevera-bold text-lg sm:text-xl mb-1"
            style={{ color: isHovered ? item.color : 'white', transition: 'color 0.3s ease' }}
          >
            {item.title}
          </h3>
          <p
            className="lato-regular text-sm leading-relaxed"
            style={{ color: isHovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.35)', transition: 'color 0.3s ease' }}
          >
            {item.description}
          </p>
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
