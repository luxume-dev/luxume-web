'use client';

import { FaUsers, FaMicrochip, FaSmile, FaRecycle, FaHeadset, FaShieldAlt } from 'react-icons/fa';

export default function AboutCoreValuesSection() {
  const values = [
    {
      icon: FaUsers,
      title: 'Customer Orientation',
      description: 'Our customers are the foundation of Luxume. We prioritize customer satisfaction through standardized processes, continuous innovation, and investments in technology and human capital.',
      iconColor: '#E91E63',
      iconBg: '#FCE4EC'
    },
    {
      icon: FaMicrochip,
      title: 'Technology First',
      description: 'Luxume adopts advanced technology across product quality, sales automation, transactions, and customer relationship management. Smart technology enables efficiency and scalability.',
      iconColor: '#2196F3',
      iconBg: '#E3F2FD'
    },
    {
      icon: FaSmile,
      title: 'People Friendly',
      description: 'At Luxume, people remain central despite technological advancements. We foster an ethical, transparent, and supportive work environment focused on growth and well-being.',
      iconColor: '#FF9800',
      iconBg: '#FFF3E0'
    },
    {
      icon: FaRecycle,
      title: 'Sustainability',
      description: 'At Luxume, sustainability is embedded across sourcing, manufacturing, and distribution. We focus on efficient resource use, waste reduction, and energy conservation.',
      iconColor: '#E91E63',
      iconBg: '#FCE4EC'
    },
    {
      icon: FaHeadset,
      title: 'Post-Sales',
      description: 'We believe in building lasting relationships beyond the point of sale. Our dedicated support team ensures customers receive prompt assistance and guidance whenever needed.',
      iconColor: '#4CAF50',
      iconBg: '#E8F5E9'
    },
    {
      icon: FaShieldAlt,
      title: 'Reliability',
      description: 'Reliability drives every process at Luxume. We deliver consistent quality through dependable products and services. Honoring commitments builds lasting customer trust.',
      iconColor: '#2196F3',
      iconBg: '#E3F2FD'
    }
  ];

  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 
            className="font-aloevera text-3xl sm:text-4xl md:text-5xl mb-4"
            style={{ color: '#D46D64' }}
          >
            Core Values
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            At Luxume, our core values define everything we build. From uncompromising strength and quality to innovation, reliability, and customer trust.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              {/* Icon */}
              <div 
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: value.iconBg }}
              >
                <value.icon 
                  className="text-xl"
                  style={{ color: value.iconColor }}
                />
              </div>

              {/* Title */}
              <h3 
                className="font-semibold text-lg mb-3"
                style={{ color: value.iconColor }}
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
