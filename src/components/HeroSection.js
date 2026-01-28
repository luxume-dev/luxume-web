'use client';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/Luxume%201920x1080%201%201.png)',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/55" ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full" style={{ paddingLeft: '100px' }}>
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h1 className="font-aloevera text-white leading-snug mb-10 drop-shadow-lg" style={{ fontSize: '64px', fontWeight: 400 }}>
            Discover the Perfect
            <br />
            Steel Solution for every
            <br />
            Design Solution
          </h1>

          {/* CTA Button */}
          <a
            href="tel:+1234567890"
            className="inline-flex items-center justify-center text-white font-medium rounded transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90"
            style={{ 
              width: '225px', 
              height: '58px', 
              padding: '10px', 
              gap: '10px',
              backgroundColor: '#C83C64',
              fontSize: '16px'
            }}
          >
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
