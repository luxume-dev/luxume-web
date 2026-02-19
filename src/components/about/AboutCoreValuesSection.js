'use client';

import { useEffect, useRef, useState } from 'react';
import {
  CustomerOrientationIcon,
  TechnologyFirstIcon,
  PeopleFriendlyIcon,
  SustainabilityIcon,
  EcoFriendlyIcon,
  ReliabilityIcon
} from '@/components/icons/CoreValueIcons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutCoreValuesSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);
  const iconRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const values = [
    {
      icon: CustomerOrientationIcon,
      title: 'Customer Orientation',
      description: 'Our customers are the foundation of Luxume. We prioritize customer satisfaction through standardized processes, continuous innovation, and investments in technology and human capital. Delivering value across the supply chain builds brand loyalty and sustainable growth.',
      color: '#F59E0B',
      iconBg: '#F59E0B15'
    },
    {
      icon: TechnologyFirstIcon,
      title: 'Technology First',
      description: 'Luxume adopts advanced technology across product quality, sales automation, transactions, and customer relationship management. Smart technology enables efficiency, scalability, real-time insights, and cost optimization. This approach gives us a strong competitive edge in the market.',
      color: '#8B5CF6',
      iconBg: '#8B5CF615'
    },
    {
      icon: PeopleFriendlyIcon,
      title: 'People Friendly',
      description: 'At Luxume, people remain central despite technological advancements. We foster an ethical, transparent, and supportive work environment focused on growth and well-being. Empowered employees create satisfied customers, strengthening trust across the entire ecosystem.',
      color: '#EC4899',
      iconBg: '#EC489915'
    },
    {
      icon: SustainabilityIcon,
      title: 'Sustainability',
      description: 'At Luxume, sustainability is embedded across sourcing, manufacturing, and distribution. We focus on efficient resource use, waste reduction, and energy conservation to ensure long-term growth. This approach strengthens profitability, trust, and business continuity.',
      color: '#C83C64',
      iconBg: '#C83C6415'
    },
    {
      icon: EcoFriendlyIcon,
      title: 'Eco-Friendly',
      description: 'As a responsible steel roofing manufacturer, Luxume follows eco-friendly practices across operations. Engineered steel ensures durability, recyclability, and efficient resource utilization. We actively reduce environmental impact and protect biodiversity.',
      color: '#10B981',
      iconBg: '#10B98115'
    },
    {
      icon: ReliabilityIcon,
      title: 'Reliability',
      description: 'Reliability drives every process at Luxume. We deliver consistent quality through dependable products and services. Honoring commitments builds lasting customer trust and brand credibility.',
      color: '#3B82F6',
      iconBg: '#3B82F615'
    }
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading — smooth fade up
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

      // Subtitle — smooth fade up after heading
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

      // Cards — smooth staggered fade up
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.9,
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

      // Icons — smooth scale in
      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;

        gsap.fromTo(icon,
          { scale: 0.3, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.6,
            delay: 0.2 + index * 0.1,
            ease: 'power2.out',
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
    <section ref={sectionRef} className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            ref={headingRef}
            className="aloevera-bold text-[36px] mb-4"
            style={{ color: '#C83C64', opacity: 0 }}
          >
            Core Values
          </h2>
          <p 
            ref={subtitleRef}
            className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto"
            style={{ opacity: 0 }}
          >
            At Luxume, our core values define everything we build. From uncompromising strength and quality to innovation, reliability, and customer trust.
          </p>
        </div>

        {/* Values Grid */}
        <div className="values-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              ref={el => cardRefs.current[index] = el}
              className="group bg-white p-6 rounded-xl transition-all duration-500 ease-out cursor-pointer"
              style={{ 
                opacity: 0,
                border: hoveredIndex === index ? `1.5px solid ${value.color}` : '1px solid #f3f4f6',
                boxShadow: hoveredIndex === index 
                  ? `0 12px 28px ${value.color}20, 0 4px 12px rgba(0,0,0,0.05)` 
                  : '0 1px 3px rgba(0,0,0,0.05)',
                transform: hoveredIndex === index ? 'translateY(-6px)' : 'translateY(0)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon */}
              <div 
                ref={el => iconRefs.current[index] = el}
                className="w-14 h-14 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500 ease-out"
                style={{ 
                  backgroundColor: value.iconBg, 
                  borderRadius: '14px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <value.icon />
              </div>

              {/* Title */}
              <h3 
                className="font-lato font-bold text-[24px] mb-3 transition-colors duration-300"
                style={{ color: value.color }}
              >
                {value.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
