'use client';

import { useState } from 'react';
import { FaShieldAlt, FaPalette, FaAward, FaPaintBrush, FaCloudRain, FaTools } from 'react-icons/fa';

export default function CoatedSteelSection() {
  const [language, setLanguage] = useState('english');

  const features = [
    {
      icon: FaShieldAlt,
      title: 'Anti Corrosion',
      description: 'Resists rust and maintains beauty.',
      color: '#6366F1'
    },
    {
      icon: FaPalette,
      title: 'Choice of Colours',
      description: 'Many vibrant colors to choose from.',
      color: '#F97316'
    },
    {
      icon: FaAward,
      title: 'Premium Product',
      description: 'Aluminum-zinc color-coated sheets that stand out in quality and appearance.',
      color: '#10B981'
    },
    {
      icon: FaPaintBrush,
      title: 'Superior Paint Technology',
      description: 'Advanced paint technology that keeps colors bright.',
      color: '#EF4444'
    },
    {
      icon: FaCloudRain,
      title: 'Weather Proof',
      description: "Suitable for Kerala's climate with intense sun and heavy rain.",
      color: '#06B6D4'
    },
    {
      icon: FaTools,
      title: 'Zero Maintenance',
      description: 'Requires no maintenance.',
      color: '#8B5CF6'
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
              className="text-sm sm:text-base font-medium mb-2 sm:mb-3"
              style={{ color: '#E91E63' }}
            >
              Inside Luxume's Coated Steel Sheets
            </p>
            <h2 className="font-aloevera text-3xl sm:text-4xl md:text-5xl leading-tight mb-4 sm:mb-6" style={{ fontWeight: 400 }}>
              <span className="text-[#1a1a4e]">Understanding</span>
              <br />
              <span className="text-[#1a1a4e]">the Layers of</span>
              <br />
              <span style={{ color: '#E91E63' }}>Coated Steel</span>
              <br />
              <span style={{ color: '#E91E63' }}>Sheets</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-md">
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
              <div className="mb-6">
                <img 
                  src="/images/diagram.png" 
                  alt="Coated Steel Layers Diagram" 
                  className="w-full h-auto"
                />
              </div>
              
              {/* Language Toggle - Pill Style */}
              <div 
                className="flex rounded-full overflow-hidden"
                style={{ 
                  border: '1px solid #E5E5E5',
                  background: '#FFFFFF'
                }}
              >
                <button
                  onClick={() => setLanguage('english')}
                  className="flex-1 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300 rounded-full"
                  style={language === 'english' ? { 
                    color: '#E91E63',
                    border: '2px solid #E91E63',
                    background: '#FFFFFF',
                    margin: '-1px'
                  } : {
                    color: '#9CA3AF',
                    background: 'transparent'
                  }}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('malayalam')}
                  className="flex-1 px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium transition-all duration-300 rounded-full"
                  style={language === 'malayalam' ? { 
                    color: '#E91E63',
                    border: '2px solid #E91E63',
                    background: '#FFFFFF',
                    margin: '-1px'
                  } : {
                    color: '#9CA3AF',
                    background: 'transparent'
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
            className="font-aloevera text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4"
            style={{ 
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#1a1a4e'
            }}
          >
            Superior Protection and Style
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Making each construction perfect with numerous excellent features. Lux Roofing offers long-lasting strength and quality. Range of Trafford, Cladding, and Sheets.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{
                border: '1px solid #F0F0F0',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${feature.color}15`,
                  border: `1px solid ${feature.color}30`
                }}
              >
                <feature.icon 
                  className="text-xl sm:text-2xl"
                  style={{ color: feature.color }}
                />
              </div>

              {/* Title */}
              <h3 className="font-semibold text-base sm:text-lg text-[#1a1a4e] mb-2">
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
