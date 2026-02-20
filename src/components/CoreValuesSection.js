'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FaRecycle, FaLeaf, FaShieldAlt, FaUsers, FaMicrochip, FaHeart } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CoreValuesSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);
  const iconRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const values = [
    {
      icon: FaRecycle,
      title: 'Sustainability',
      description: 'At Luxume, sustainability is embedded across sourcing, manufacturing, and distribution. We focus on efficient resource use, waste reduction, and energy conservation to ensure long-term growth. This approach strengthens profitability, trust, and business continuity.',
      color: '#C83C64',
      animation: 'spin-slow'
    },
    {
      icon: FaLeaf,
      title: 'Eco-Friendly',
      description: 'As a responsible steel roofing manufacturer, Luxume follows eco-friendly practices across operations. Engineered steel ensures durability, recyclability, and efficient resource utilization. We actively reduce environmental impact and protect biodiversity.',
      color: '#10B981',
      animation: 'sway'
    },
    {
      icon: FaShieldAlt,
      title: 'Reliability',
      description: 'Reliability drives every process at Luxume. We deliver consistent quality through dependable products and services. Honoring commitments builds lasting customer trust and brand credibility.',
      color: '#3B82F6',
      animation: 'shield-pulse'
    },
    {
      icon: FaUsers,
      title: 'Customer Orientation',
      description: 'Our customers are the foundation of Luxume. We prioritize customer satisfaction through standardized processes, continuous innovation, and investments in technology and human capital. Delivering value across the supply chain builds brand loyalty and sustainable growth.',
      color: '#F59E0B',
      animation: 'bounce-subtle'
    },
    {
      icon: FaMicrochip,
      title: 'Technology First',
      description: 'Luxume adopts advanced technology across product quality, sales automation, transactions, and customer relationship management. Smart technology enables efficiency, scalability, real-time insights, and cost optimization. This approach gives us a strong competitive edge in the market.',
      color: '#8B5CF6',
      animation: 'glow-pulse'
    },
    {
      icon: FaHeart,
      title: 'People Friendly',
      description: 'At Luxume, people remain central despite technological advancements. We foster an ethical, transparent, and supportive work environment focused on growth and well-being. Empowered employees create satisfied customers, strengthening trust across the entire ecosystem.',
      color: '#EC4899',
      animation: 'heartbeat'
    }
  ];

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
      // Heading — slide in from left with clip reveal
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

      // Subtitle — typewriter-like fade from right
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0,
          duration: 0.9,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

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
              trigger: sectionRef.current.querySelector('.values-grid'),
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
        <div className="mb-8 sm:mb-10 md:mb-12 text-center sm:text-left">
          <h2 
            ref={headingRef}
            className="aloevera-bold text-3xl sm:text-4xl md:text-5xl lg:text-4xl mb-3 sm:mb-4"
            style={{ 
              color: '#D46D64',
              opacity: 0
            }}
          >
            Core Values
          </h2>
          <p ref={subtitleRef} className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto sm:mx-0" style={{ opacity: 0 }}>
            At Luxume, our core values define everything we build. From uncompromising strength and quality to innovation, reliability, and customer trust.
          </p>
        </div>

        {/* Values Grid */}
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
                <div 
                  ref={el => iconRefs.current[index] = el}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 icon-${value.animation}`}
                  style={{
                    background: `linear-gradient(135deg, ${value.color}20 0%, ${value.color}40 100%)`,
                    border: `1px solid ${value.color}50`
                  }}
                >
                  <value.icon 
                    className="text-xl sm:text-2xl"
                    style={{ color: value.color }}
                  />
                </div>

                {/* Title */}
                <h3 
                  className="font-semibold text-lg sm:text-xl mb-2 sm:mb-3"
                  style={{ color: value.color }}
                >
                  {value.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed text-white flex-grow" style={{ fontSize: '16px' }}>
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
