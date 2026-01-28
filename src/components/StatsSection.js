'use client';

export default function StatsSection() {
  const stats = [
    {
      value: '$23 Billion',
      label1: 'Annual',
      label2: 'Revenue'
    },
    {
      value: '200K+',
      label1: 'Happy Customers',
      label2: 'Across India & Abroad'
    },
    {
      value: '15+ Years',
      label1: 'Industry',
      label2: 'Experience'
    },
    {
      value: '98%',
      label1: 'Customer Rating Across',
      label2: 'Platforms'
    }
  ];

  return (
    <section className="bg-white">
      {/* Stats Grid */}
      <div className="py-12 px-8 my-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <h3 className="font-aloevera text-[#1a1a4e] text-3xl md:text-4xl mb-2" style={{ fontWeight: 400 }}>
                  {stat.value}
                </h3>
                <p className="text-gray-500 text-sm">{stat.label1}</p>
                <p className="text-gray-500 text-sm">{stat.label2}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roofing Image Banner */}
      <div className="w-full">
        <img 
          src="/images/Rectangle 8.png" 
          alt="Steel Roofing" 
          className="w-full h-auto object-cover"
          style={{ maxHeight: '400px', objectFit: 'cover' }}
        />
      </div>
    </section>
  );
}
