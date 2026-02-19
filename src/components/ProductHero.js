'use client';

export default function ProductHero({ heading, backgroundImage }) {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0" style={{ backgroundColor: '#000000DE' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 text-center">
        <h1 
          className="aloevera-bold text-white leading-tight drop-shadow-lg max-w-3xl mx-auto" 
          style={{ fontSize: '64px' }}
        >
          {heading}
        </h1>
      </div>
    </section>
  );
}
