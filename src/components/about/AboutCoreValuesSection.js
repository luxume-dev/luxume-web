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
      // Heading — drop from above with bounce
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: -40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Subtitle — fade up with blur
      gsap.fromTo(subtitleRef.current,
        { opacity: 0, filter: 'blur(6px)', y: 15 },
        {
          opacity: 1, filter: 'blur(0px)', y: 0,
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

      // Cards — zoom-in from center (scale up from small with slight spread)
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          { opacity: 0, scale: 0.4 },
          {
            opacity: 1, scale: 1,
            duration: 0.7,
            delay: index * 0.08,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: sectionRef.current.querySelector('.values-grid'),
              start: 'top 82%',
              toggleActions: 'play none none none',
            }
          }
        );
      });

      // Icons — spin in 
      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;

        gsap.fromTo(icon,
          { scale: 0, rotate: -360, opacity: 0 },
          {
            scale: 1, rotate: 0, opacity: 1,
            duration: 0.7,
            delay: 0.15 + index * 0.08,
            ease: 'power3.out',
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
              className="group bg-white p-6 rounded-xl cursor-pointer"
              style={{ 
                opacity: 0,
                border: hoveredIndex === index ? `1.5px solid ${value.color}` : '1px solid #f3f4f6',
                boxShadow: hoveredIndex === index 
                  ? `0 8px 24px ${value.color}15` 
                  : '0 1px 3px rgba(0,0,0,0.05)',
                transform: hoveredIndex === index ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Icon */}
              <div 
                ref={el => iconRefs.current[index] = el}
                className="w-14 h-14 flex items-center justify-center mb-4"
                style={{ 
                  backgroundColor: value.iconBg, 
                  borderRadius: '14px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
                  transform: hoveredIndex === index ? 'scale(1.15) rotate(5deg)' : 'scale(1) rotate(0deg)',
                  transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <value.icon />
              </div>

              {/* Title with underline expand */}
              <h3 
                className="font-lato font-bold text-[24px] mb-3 relative inline-block"
                style={{ color: value.color }}
              >
                {value.title}
                <span 
                  className="absolute bottom-0 left-0 h-[2px] rounded-full"
                  style={{ 
                    backgroundColor: value.color,
                    width: hoveredIndex === index ? '100%' : '0%',
                    transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                />
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
