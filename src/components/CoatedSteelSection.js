'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function CoatedSteelSection({ isColorsAvailable = true }) {
  const [language, setLanguage] = useState('english');
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [language]);

  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">

        {/* Understanding Layers Section */}
        {isColorsAvailable && (
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
                  loading="lazy"
                  decoding="async"
                  width={1235}
                  height={1280}
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
        )}

      </div>
    </section>
  );
}
