'use client';

import { FaRecycle, FaLeaf, FaShieldAlt, FaUsers, FaMicrochip, FaHeart } from 'react-icons/fa';

export default function CoreValuesSection() {
  const values = [
    {
      icon: FaRecycle,
      title: 'Sustainability',
      description: 'At Luxume, sustainability is embedded across sourcing, manufacturing, and distribution. We focus on efficient resource use, waste reduction, and energy conservation to ensure long-term growth. This approach strengthens profitability, trust, and business continuity.',
      color: '#E91E63'
    },
    {
      icon: FaLeaf,
      title: 'Eco-Friendly',
      description: 'As a responsible steel roofing manufacturer, Luxume follows eco-friendly practices across operations. Engineered steel ensures durability, recyclability, and efficient resource utilization. We actively reduce environmental impact and protect biodiversity.',
      color: '#4CAF50'
    },
    {
      icon: FaShieldAlt,
      title: 'Reliability',
      description: 'Reliability drives every process at Luxume. We deliver consistent quality through dependable products and services. Honoring commitments builds lasting customer trust and brand credibility.',
      color: '#2196F3'
    },
    {
      icon: FaUsers,
      title: 'Customer Orientation',
      description: 'Our customers are the foundation of Luxume. We prioritize customer satisfaction through standardized processes, continuous innovation, and investments in technology and human capital. Delivering value across the supply chain builds brand loyalty and sustainable growth.',
      color: '#9C27B0'
    },
    {
      icon: FaMicrochip,
      title: 'Technology First',
      description: 'Luxume adopts advanced technology across product quality, sales automation, transactions, and customer relationship management. Smart technology enables efficiency, scalability, real-time insights, and cost optimization. This approach gives us a strong competitive edge in the market.',
      color: '#00BCD4'
    },
    {
      icon: FaHeart,
      title: 'People Friendly',
      description: 'At Luxume, people remain central despite technological advancements. We foster an ethical, transparent, and supportive work environment focused on growth and well-being. Empowered employees create satisfied customers, strengthening trust across the entire ecosystem.',
      color: '#E040FB'
    }
  ];

  return (
    <section 
      className="relative py-12 px-4 sm:py-16 sm:px-6 md:py-20 md:px-8 lg:py-24"
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
      <div className="relative z-10 max-w-7xl mx-auto ml-16 mr-16">
        {/* Header */}
        <div className="mb-8 sm:mb-10 md:mb-12 text-center sm:text-left">
          <h2 
            className="font-aloevera text-3xl sm:text-4xl md:text-5xl lg:text-5xl mb-3 sm:mb-4"
            style={{ 
              fontWeight: 400,
              background: 'linear-gradient(90deg, #E91E63 0%, #F44336 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Core Values
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto sm:mx-0">
            At Luxume, our core values define everything we build. From uncompromising strength and quality to innovation, reliability, and customer trust.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {values.map((value, index) => (
            <div 
              key={index}
              className="p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 active:scale-[0.98]"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4"
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
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
