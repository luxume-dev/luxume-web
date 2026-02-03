'use client';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-right md:bg-center"
        style={{
          backgroundImage: 'url(/images/Luxume%201920x1080%201%201.png)',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h1 className="font-aloevera text-white leading-snug mb-6 sm:mb-8 md:mb-10 drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-50" style={{ fontWeight: 400 }}>
            Discover the Perfect
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Steel Solution for every
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Design Solution
          </h1>

          {/* CTA Button */}
          <a
            href="tel:+1234567890"
            className="inline-flex items-center justify-center text-white font-medium rounded transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90 w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base"
            style={{ 
              backgroundColor: '#C83C64',
              maxWidth: '225px'
            }}
          >
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
