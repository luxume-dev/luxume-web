'use client';

import { useEffect, useRef } from 'react';
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

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading — fade up
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Subtitle — fade up with delay
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Cards — staggered fade up
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out',
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
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.88) 0%, rgba(0, 0, 0, 0.78) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center sm:text-left">
          <h2 
            ref={headingRef}
            className="font-aloevera text-3xl sm:text-4xl md:text-5xl lg:text-4xl mb-3 sm:mb-4"
            style={{ 
              fontWeight: 700,
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
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="group p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98]"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                opacity: 0
              }}
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
                  className="text-xl sm:text-2xl transition-transform duration-300"
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
              <p className="text-gray-400 leading-relaxed" style={{ fontSize: '16px' }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

