'use client';

export default function BlogHeroSection() {
  return (
    <section className="relative">
      {/* Background with dark overlay */}
      <div 
        className="w-full h-[280px] md:h-[320px] bg-cover bg-center bg-no-repeat rounded-b-3xl overflow-hidden mx-auto"
        style={{
          backgroundImage: 'url(/images/blog.png)',
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
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.7) 100%)',
            marginLeft: '20px',
            marginRight: '20px',
            marginTop: '20px',
            maxWidth: 'calc(100% - 40px)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-start justify-center text-left px-8 md:px-16 lg:px-24">
          <h1 className="font-aloevera text-white text-3xl sm:text-4xl md:text-5xl mb-4 italic">
            Luxume Insights & Updates
          </h1>
          
          <p className="text-white/80 text-sm sm:text-base max-w-xl">
            Stay informed with expert knowledge on roofing solutions, product innovations, industry trends, and professional guidance for all your steel roofing needs.
          </p>
        </div>
      </div>
    </section>
  );
}
