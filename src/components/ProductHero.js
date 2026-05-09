'use client';

export default function ProductHero({ heading, backgroundImage }) {
  return (
    <section className="relative min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 text-center mt-20">
        <h1 
          className="aloevera-bold text-white leading-tight drop-shadow-lg max-w-3xl mx-auto text-4xl md:text-5xl lg:text-[64px]" 
        >
          {heading}
        </h1>
      </div>
    </section>
  );
}
