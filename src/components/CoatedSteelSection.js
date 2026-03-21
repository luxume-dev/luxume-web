'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AntiCorrosionIcon, ChoiceOfColoursIcon, PremiumProductIcon, SuperiorPaintIcon, WeatherProofIcon, ZeroMaintenanceIcon } from './icons/CoatedSteelIcons';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function CoatedSteelSection() {
  const [language, setLanguage] = useState('english');
  const imageRef = useRef(null);
  const featuresRef = useRef(null);
  const featureCardsRef = useRef([]);

  // 3D tilt hover handler
  const handleMouseMove = useCallback((e, index) => {
    const card = featureCardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

    // Inner glow follows cursor
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(200, 60, 100, 0.06) 0%, rgba(255,255,255,1) 60%)`;
  }, []);

  const handleMouseLeave = useCallback((index) => {
    const card = featureCardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      clearProps: 'transform'
    });
    card.style.background = '#FFFFFF';
  }, []);

  // GSAP animation when language changes
  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [language]);

  // Scroll-triggered animation for feature cards — rotate-in from bottom
  useEffect(() => {
    const cards = featureCardsRef.current;

    if (cards.length > 0) {
      // Set initial state — rotated in with perspective
      gsap.set(cards, {
        opacity: 0,
        rotateX: 25,
        y: 80,
        transformPerspective: 800,
        transformOrigin: 'center bottom'
      });

      // Create staggered rotate-in animation
      gsap.to(cards, {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        onComplete: () => {
          gsap.set(cards, { clearProps: 'transform,opacity,transformPerspective,transformOrigin' });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: AntiCorrosionIcon,
      iconBg: '#F3F4F6',
      title: 'Anti Corrosion',
      description: 'Resists rust and maintains beauty.',
    },
    {
      icon: ChoiceOfColoursIcon,
      iconBg: '#FFEDD4',
      title: 'Choice of Colours',
      description: 'Many vibrant colors to choose from.',
    },
    {
      icon: PremiumProductIcon,
      iconBg: '#F3E8FF',
      title: 'Premium Product',
      description: 'Aluminum-zinc color-coated sheets that stand out in quality and appearance.',
    },
    {
      icon: SuperiorPaintIcon,
      iconBg: '#FCE7F3',
      title: 'Superior Paint Technology',
      description: 'Advanced paint technology that keeps colors bright.',
    },
    {
      icon: WeatherProofIcon,
      iconBg: '#DBEAFE',
      title: 'Weather Proof',
      description: "Suitable for Kerala's climate with intense sun and heavy rain.",
    },
    {
      icon: ZeroMaintenanceIcon,
      iconBg: '#DCFCE7',
      title: 'Zero Maintenance',
      description: 'Requires no maintenance.',
    }
  ];

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">

        {/* Understanding Layers Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16 sm:mb-20 md:mb-24">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <p
              className="text-sm sm:text-base font-medium mb-2 sm:mb-3 text-center lg:text-left"
              style={{ color: '#E91E63' }}
            >
              Inside Luxume's Coated Steel Sheets
            </p>
            <h2 className="aloevera-bold text-[36px] sm:text-[48px] lg:text-[64px] leading-tight mb-4 sm:mb-6 text-center lg:text-left">
              <span className="text-[#1C1E54]">Understanding</span>
              <br className='hidden lg:block' />
              <span className="text-[#1C1E54]">the Layers of </span>
              <br className='hidden lg:block' />
              <span style={{ color: '#C83C64' }}>Coated Steel</span>
              <br className='hidden lg:block' />
              <span style={{ color: '#C83C64' }}>Sheets</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              This diagram illustrates the multiple layers involved in the production of coated steel sheets, highlighting their protective and functional coatings.
            </p>
          </div>

          {/* Right Content - Diagram */}
          <div className="flex flex-col items-center justify-center">
            {/* Box Container for Image and Buttons */}
            <div
              className="w-full max-w-md lg:max-w-lg p-6 sm:p-8 rounded-2xl"
              style={{
                border: '1px solid #E5E5E5',
                background: '#FFFFFF'
              }}
            >
              {/* Diagram Image */}
              <div className="mb-6 relative rounded-xl overflow-hidden" style={{ aspectRatio: '1235/1280' }}>
                <img
                  ref={imageRef}
                  src={language === 'english' ? '/images/layers-english.webp' : '/images/layers-malayalam.webp'}
                  alt={language === 'english' ? 'Coated Steel Layers Diagram' : 'Coated Steel Layers Diagram (Malayalam)'}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Language Toggle - Pill Style */}
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
                <button
                  onClick={() => setLanguage('english')}
                  className="flex-1 text-sm sm:text-base font-medium transition-all duration-300"
                  style={language === 'english' ? {
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
                  }}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('malayalam')}
                  className="flex-1 text-sm sm:text-base font-medium transition-all duration-300"
                  style={language === 'malayalam' ? {
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
                  }}
                >
                  Malayalam
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Superior Protection Section */}
        <div className="text-center mb-10 sm:mb-12 md:mb-14">
          <h2
            className="aloevera-bold text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-[#C83C64]"
          >
            Superior Protection and Style
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Making each construction perfect with numerous excellent features. Luxume Roofing offers long-lasting strength and quality for the range of trafford and cladding sheets.
          </p>
        </div>

        {/* Features Grid — with 3D tilt hover */}
        <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => featureCardsRef.current[index] = el}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl cursor-pointer group"
              style={{
                border: '1px solid #F0F0F0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                willChange: 'transform'
              }}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                style={{ background: feature.iconBg }}
              >
                <feature.icon />
              </div>

              {/* Title */}
              <h3 className="aloevera-medium text-[20px] text-[#1a1a4e] mb-2 transition-colors duration-300 group-hover:text-[#C83C64]">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
