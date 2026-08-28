'use client';

export default function ProductsIntro() {
  return (
    <section className="w-full py-12 bg-white flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h3 
          className="text-[14px] font-normal tracking-widest uppercase mb-4 font-lato"
          style={{ color: 'var(--primary)' }}
        >
          Our Products
        </h3>
        
        <h2 
          className="aloevera-bold text-4xl md:text-[48px] leading-tight mb-6"
          style={{ 
            color: 'var(--secondary)'
          }}
        >
          Premium Steel Solutions
        </h2>
        
        <p 
          className="lato-regular text-[16px] max-w-2xl mx-auto leading-[28px] mb-8"
          style={{ 
            color: 'var(--text-description)'
          }}
        >
          Discover our comprehensive range of high-quality color-coated steel products designed to deliver unmatched strength, durability, and aesthetic appeal for your projects.
        </p>
      </div>
    </section>
  );
}
