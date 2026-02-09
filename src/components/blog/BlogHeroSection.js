'use client';

export default function BlogHeroSection() {
  return (
    <section className="relative">
      {/* Background with dark overlay */}
      <div 
        className="w-full h-[280px] sm:h-[300px] md:h-[350px] bg-cover bg-center bg-no-repeat overflow-hidden relative"
        style={{
          backgroundImage: 'url(/images/blog.png)',
        }}
      >
        {/* Dark overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.85) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-start justify-center text-left px-4 sm:px-8 md:px-16 lg:px-24">
          <h1 className="font-aloevera font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">
            Luxume Insights & Updates
          </h1>
          
          <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-xl">
            Stay informed with expert knowledge on roofing solutions, product innovations, industry trends, and professional guidance for all your steel roofing needs.
          </p>
        </div>
      </div>
    </section>
  );
}
