'use client';

export default function HowWeWorkSection() {
  const steps = [
    {
      number: '1',
      title: 'Connect With Us',
      description: 'Reach out to our team through phone, email, or visit our office. Share your requirements and our experts will guide you through our product range to find the perfect solution for your project.'
    },
    {
      number: '2',
      title: 'Choose the Right Roofing Solution',
      description: 'Based on your needs, we recommend the ideal color-coated steel sheets from our extensive catalog. Consider factors like durability, aesthetics, climate compatibility, and budget to make the best choice.'
    },
    {
      number: '3',
      title: 'Order & Delivery',
      description: 'Once you finalize your selection, place your order with ease. We ensure timely manufacturing and delivery to your location, maintaining the highest quality standards throughout the process.'
    }
  ];

  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 sm:px-8 mb-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
          {/* Left - Steps content */}
          <div className="w-full lg:w-1/2">
            {/* Heading */}
            <h2 
              className="font-aloevera text-3xl sm:text-4xl mb-8"
              style={{ color: '#C83C64' }}
            >
              How We Work
            </h2>

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  {/* Number circle */}
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                    style={{ 
                      backgroundColor: '#C83C64',
                      fontSize: '16px'
                    }}
                  >
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
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
              className="w-full h-auto rounded-lg shadow-lg object-cover"
              style={{ maxHeight: '450px', objectPosition: 'center' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
