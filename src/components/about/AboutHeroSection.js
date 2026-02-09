'use client';

export default function AboutHeroSection() {
  return (
    <section className="relative">
      {/* Background Image */}
      <div 
        className="w-full h-[500px] md:h-[600px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/about.png)',
        }}
      />

      {/* Mission & Vision Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 -mt-24 md:-mt-32 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 
              className="text-center font-medium text-lg mb-4"
              style={{ color: '#C83C64' }}
            >
              Mission
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              To establish Luxume as a trusted brand that fulfills customer requirements through advanced technology and strong core values. To expand our product portfolio and build a vibrant dealer network, achieving strong growth across Kerala and becoming a reputed South Indian brand within five years.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h3 
              className="text-center font-medium text-lg mb-4"
              style={{ color: '#C83C64' }}
            >
              Vision
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed text-center">
              To become a responsible, reliable, and preferred brand in steel sheets and related products through consistent quality and innovation. To achieve market leadership across India by 2035 by earning long-term customer trust and industry recognition.
            </p>
          </div>
        </div>
      </div>

      {/* Spacer for cards below image */}
      <div className="h-4 md:h-8 bg-white" />
    </section>
  );
}
