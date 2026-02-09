'use client';

export default function AboutUsSection() {
  return (
    <section className="bg-white pt-8 md:pt-12 pb-8 md:pb-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left - Image */}
          <div className="w-full lg:w-1/2">
            <img 
              src="/images/sheet.png" 
              alt="Colorful roofing sheets" 
              className="w-full h-auto"
            />
          </div>

          {/* Right - Text content */}
          <div className="w-full lg:w-1/2">
            {/* About Us heading */}
            <h2 
              className="font-aloevera text-3xl sm:text-4xl mb-6"
              style={{ color: '#C83C64' }}
            >
              About Us
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-7 mb-4">
              Luxume head quartered at Chittoor Road, Ernakulam is a leading manufacturer of colour-coated steel sheets which is primarily supplied to the construction industry. We began our operations in the year 2011. Since then, we have been manufacturing high-quality colour coated steel sheets that excel in durability, performance, and aesthetic appeal that safeguard and enhance the elevation of structures in which they are used.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-7 mb-4">
              Our product is best suited for roofing, cladding walls, and other fabrication purposes. Profiling of sheets in multiple variations is a value-added service offered by Luxume. Luxume is part of a family business that conducts businesses in flexible packaging, steel, etc.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-7">
              We pride ourselves on delivering premium quality products backed by exceptional customer service. Our commitment to innovation drives us to continuously improve our manufacturing processes and product offerings to meet the evolving needs of the construction industry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
