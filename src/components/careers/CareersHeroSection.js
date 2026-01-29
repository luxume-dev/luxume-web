'use client';

export default function CareersHeroSection() {
  return (
    <section className="relative">
      {/* Background Image */}
      <div 
        className="w-full h-[400px] md:h-[500px] bg-cover bg-center bg-no-repeat rounded-b-3xl overflow-hidden mx-auto"
        style={{
          backgroundImage: 'url(/images/luxumeteam.png)',
          maxWidth: 'calc(100% - 40px)',
          marginLeft: '20px',
          marginRight: '20px',
          marginTop: '20px'
        }}
      >
        {/* Dark overlay */}
        <div 
          className="absolute inset-0 rounded-b-3xl"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 100%)',
            marginLeft: '20px',
            marginRight: '20px',
            marginTop: '20px',
            maxWidth: 'calc(100% - 40px)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-aloevera text-white text-4xl sm:text-5xl md:text-6xl mb-4 italic">
            Join the<br />Luxume Team
          </h1>
          
          <p className="text-white/90 text-sm sm:text-base max-w-md mb-8">
            Grow your career with a trusted leader in roofing solutions and industrial excellence.
          </p>

          <a
            href="#openings"
            className="px-8 py-3 rounded-full text-white font-medium transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#C83C64' }}
          >
            Explore Opportunities
          </a>
        </div>
      </div>
    </section>
  );
}
