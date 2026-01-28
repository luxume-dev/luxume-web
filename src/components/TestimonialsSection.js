'use client';

import { FaStar, FaQuoteRight } from 'react-icons/fa';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Luxume roofing completely transformed our home. The finish is premium, the structure feels solid, and even after heavy rains and heat, the performance is outstanding.",
      name: "Priya Menon",
      location: "Calicut",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "We chose Luxume for its strength and design flexibility. The installation was smooth, and the sheets deliver exactly what they promise—durability and style.",
      name: "Rajesh Kumar",
      location: "Bangalore",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "After using Luxume roofing sheets, we no longer worry about weather damage. The quality is unmatched, and the look adds real value to the property.",
      name: "Anjali Sharma",
      location: "Ernakulam",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <section className="bg-white py-16 px-4 sm:py-20 sm:px-6 md:py-24 md:px-8 lg:py-28 ml-16 mr-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 
            className="font-aloevera text-3xl sm:text-4xl md:text-5xl mb-4"
            style={{ fontWeight: 400, fontStyle: 'italic' }}
          >
            <span className="text-[#1a1a4e]">Trusted by Homes</span>
            <br />
            <span style={{ color: '#E91E63' }}>That Demand Strength</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mt-4 sm:mt-6">
            From modern residences to large-scale projects, Luxume roofing sheets have earned the trust of customers through durability, design excellence, and long-lasting performance. Here's what our clients have to say about building with Luxume.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white p-6 sm:p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid #F5F5F5'
              }}
            >
              {/* Quote Icon */}
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: '#E91E63' }}
              >
                <FaQuoteRight className="text-white text-lg sm:text-xl" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm sm:text-base" />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>

              {/* Divider */}
              <div 
                className="w-12 h-1 mb-4 rounded-full"
                style={{ background: '#E91E63' }}
              />

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  {/* Verified Badge */}
                  <div 
                    className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center"
                    style={{ background: '#E91E63' }}
                  >
                    <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-sm sm:text-base text-[#1a1a4e]">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-xs sm:text-sm">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
