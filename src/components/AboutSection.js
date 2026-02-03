'use client';

export default function AboutSection() {
  return (
    <section className="bg-white my-8 sm:my-12 md:my-16 px-4 sm:px-6 md:px-8">
      <div className="mx-auto flex flex-col items-center text-center">

        {/* Heading */}
        <h2 className="mb-6 sm:mb-8 md:mb-10 text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight">
          <span className="font-aloevera font-bold text-[#C83C64]">
            Secure & Stylish
          </span>
          <span className="font-aloevera font-bold text-[#1a1a4e]">
            : The Smart Home Shield
          </span>
        </h2>

        {/* Description */}
        <p className="max-w-4xl text-sm sm:text-[15px] leading-7 sm:leading-8 text-[#666666] text-center px-2 sm:px-4">
          Luxume head quartered at Chittoor Road, Ernakulam is a leading manufacturer
          of colour-coated steel sheets which is primarily supplied to the construction
          industry. We began our operations in the year 2011. Since then, we have been
          manufacturing high-quality colour coated steel sheets that excel in durability,
          performance, and aesthetic appeal that safeguard and enhance the elevation of
          structures in which they are used. Our product is best suited for roofing,
          cladding walls, and other fabrication purposes. Profiling of sheets in multiple
          variations is a value-added service offered by Luxume. Luxume is part of a
          family business that conducts businesses in flexible packaging, steel, etc.
        </p>

      </div>
    </section>
  );
}