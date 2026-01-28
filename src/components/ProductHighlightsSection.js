'use client';

import { FaCheck } from 'react-icons/fa';

export default function ProductHighlightsSection() {
  const highlights = [
    {
      title: 'Easy Installation',
      description: 'The installation process is quick and easy, saving time and effort.'
    },
    {
      title: 'Durable & Long-lasting',
      description: 'Built to withstand harsh weather conditions for years of reliable performance.'
    },
    {
      title: 'Cost Effective',
      description: 'Premium quality at competitive prices, maximizing value for your investment.'
    },
    {
      title: 'Eco-Friendly',
      description: 'Sustainable materials that are recyclable and environmentally responsible.'
    },
    {
      title: 'Weather Resistant',
      description: 'Excellent protection against rain, sun, and extreme temperatures.'
    },
    {
      title: 'Low Maintenance',
      description: 'Requires minimal upkeep while maintaining its pristine appearance.'
    }
  ];

  return (
    <section 
      className="relative py-16 px-4 sm:py-20 sm:px-6 md:py-24 md:px-8 lg:py-28"
      style={{
        backgroundImage: 'url(/images/roof.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(10, 10, 30, 0.92) 0%, rgba(10, 10, 30, 0.88) 100%)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left - Image */}
          <div className="flex justify-center lg:justify-start">
            <div 
              className="relative w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[28rem] rounded-full overflow-hidden"
              style={{
                border: '4px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <img 
                src="/images/Group 57.png" 
                alt="Luxume Product Expert" 
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right - Content */}
          <div>
            {/* Header */}
            <h2 
              className="font-aloevera text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6"
              style={{ fontWeight: 400 }}
            >
              Product Highlights
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-8 sm:mb-10 max-w-xl">
              Our products come with a range of unique features and benefits that make them a preferred choice among architects, builders, structural engineers, designers, contractors and house owners alike. We offer long-lasting and visually appealing colour-coated steel sheets that have the following features.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex gap-3 sm:gap-4">
                  {/* Checkmark Icon */}
                  <div 
                    className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <FaCheck className="text-white text-xs sm:text-sm" />
                  </div>
                  
                  {/* Text */}
                  <div>
                    <h3 className="text-white font-semibold text-sm sm:text-base mb-1">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
