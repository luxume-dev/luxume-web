'use client';

export default function ProductsIntro() {
  return (
    <section className="w-full py-16 md:py-24 bg-white flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-4xl mx-auto">
        <h3 
          className="text-[14px] font-normal tracking-widest uppercase mb-4 font-lato"
          style={{ color: 'var(--primary)' }}
        >
          Our Products
        </h3>
        
        <h1 
          className="font-aloevera text-[48px] leading-tight mb-6"
          style={{ 
            color: 'var(--secondary)',
            fontWeight: 700,
            fontStyle: 'normal'
          }}
        >
          Premium Steel Solutions
        </h1>
        
        <p 
          className="text-[16px] max-w-2xl mx-auto leading-[28px] font-lato mb-12"
          style={{ 
            color: 'var(--text-description)',
            fontWeight: 400
          }}
        >
          Discover our comprehensive range of high-quality color-coated steel products designed to deliver unmatched strength, durability, and aesthetic appeal for your projects.
        </p>
      </div>
    </section>
  );
}
