'use client';

export default function HowWeWorkSection() {
  const steps = [
    {
      number: '01',
      title: 'Connect With Us',
      description: 'Reach out to Luxume to share your roofing requirements. Our team will understand your project needs, application type, and quantity requirements to guide you toward the right product selection.'
    },
    {
      number: '02',
      title: 'Choose the Right Roofing Solution',
      description: 'Based on your requirements, we help you select the most suitable roofing sheets, profiles, and finishes. You\'ll receive clear product details, specifications, and a competitive quotation for review.'
    },
    {
      number: '03',
      title: 'Order & Delivery',
      description: 'Once the order is confirmed, we process it efficiently and ensure timely delivery of high-quality Luxume roofing sheets to your location, ready for installation by your preferred contractor.'
    }
  ];

  return (
    <section className="bg-white pt-8 md:pt-12 pb-16 md:pb-24 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Left - Steps content */}
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h2 
              className="font-aloevera font-bold text-3xl sm:text-4xl md:text-5xl mb-4"
              style={{ color: '#C83C64' }}
            >
              How We Work
            </h2>

            {/* Subtitle */}
            <p className="text-gray-600 text-sm sm:text-base mb-10 max-w-md">
              Our process is designed to be simple, transparent, and customer-focused, ensuring you get the right roofing solution with ease.
            </p>

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 sm:gap-6">
                  {/* Number */}
                  <span 
                    className="text-2xl sm:text-3xl font-light text-gray-300 flex-shrink-0 w-8"
                  >
                    {step.number}
                  </span>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 
                      className="font-bold text-lg sm:text-xl mb-2"
                      style={{ color: '#0F172B' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="w-full lg:w-1/2">
            <img 
              src="/images/man.png" 
              alt="Worker installing roofing" 
              className="w-full h-auto rounded-2xl object-cover"
              style={{ maxHeight: '550px', objectPosition: 'center' }}
            />
          </div>
        </div>

        {/* Luxume Focus Paragraph - Bottom centered */}
        <p className="text-gray-600 text-sm sm:text-base text-center mt-12 max-w-2xl mx-auto">
          Luxume focuses on delivering premium roofing materials engineered for durability, performance, and long-term value.
        </p>
      </div>
    </section>
  );
}

