'use client';

export default function CareersHeroSection() {
  return (
    <section className="relative px-3 sm:px-4 md:px-5 pt-3 sm:pt-4 md:pt-5">
      {/* Background Image */}
      <div 
        className="w-full h-[350px] sm:h-[400px] md:h-[500px] bg-cover bg-center bg-no-repeat rounded-2xl sm:rounded-3xl overflow-hidden relative"
        style={{
          backgroundImage: 'url(/images/luxumeteam.png)',
        }}
      >
        {/* Dark overlay */}
        <div 
          className="absolute inset-0 rounded-2xl sm:rounded-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-aloevera text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 italic">
            Join the<br />Luxume Team
          </h1>
          
          <p className="text-white/90 text-sm sm:text-base max-w-md mb-6 sm:mb-8 px-4">
            Grow your career with a trusted leader in roofing solutions and industrial excellence.
          </p>

          <a
            href="#openings"
            className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#C83C64' }}
          >
            Explore Opportunities
          </a>
        </div>
      </div>
    </section>
  );
}
