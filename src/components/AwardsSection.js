'use client';

import Image from 'next/image';

const awards = [
  {
    image: '/images/award-1.webp',
    title: 'Best Roofing Sheet Brand',
    event: 'Nirmithi Puraskar 2025',
    by: 'Media One',
  },
  {
    image: '/images/award-2.webp',
    title: 'Award Ceremony',
    event: 'Nirmithi Puraskar 2025',
    by: 'Media One',
  },
];

export default function AwardsSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span
            className="inline-block text-sm font-lato font-semibold px-5 py-1.5 rounded-full mb-4 tracking-wide"
            style={{ backgroundColor: '#FEF2F2', color: '#C83C64' }}
          >
            Recognition
          </span>
          <h2
            className="font-aloevera text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#1a1b4b' }}
          >
            Awards & Achievements
          </h2>
          <p className="font-lato text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Recognised for excellence in roofing solutions and outstanding contribution to the construction industry.
          </p>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {awards.map((award, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              style={{ border: '1px solid #e5e7eb' }}
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Info Overlay */}
              <div className="p-5 bg-white">
                <h3
                  className="font-aloevera text-lg md:text-xl font-bold mb-1"
                  style={{ color: '#1a1b4b' }}
                >
                  {award.title}
                </h3>
                <p className="font-lato text-sm text-gray-500">
                  {award.event} &middot; {award.by}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
