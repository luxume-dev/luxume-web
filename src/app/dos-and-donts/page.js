import Link from 'next/link';

export const metadata = {
  title: "Do's & Don'ts",
  description: "Essential guidelines for proper handling, storage, and maintenance of Luxume roofing products.",
  alternates: { canonical: '/dos-and-donts' },
};

const dos = [
  "Always keep the material in a dry, shaded and good ventilated area.",
  "If not required for immediate use, provide cover to protect the material.",
  "If the sheets become wet during storage, separate them without delay. Clean the moisture on the surface with a clean cloth. Stack the sheets with gaps between them for air circulation.",
  "Always keep the material slightly above the ground by using wooden or rubber plank.",
];

const donts = [
  "Do not keep the material on wet floor (water, rain, etc.).",
  "Moisture or water penetration between the sheets through the wooden pallets can cause damage hence it should be avoided.",
  "Unlike metals contact should be avoided whenever possible.",
  "Do not let the sheets come in contact with salt, water, corrosive chemicals, ash, fumes, foundries, plating works, kilns, fertilizers and wet or green lumber.",
  "Do not slide sheet on rough surface or over each other.",
  "Contact with mud and dirt should be strictly prohibited.",
];

export default function DosAndDontsPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-28 md:py-36 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a1b4b 0%, #2d2f6b 60%, #C83C64 100%)' }}
      >
        {/* Decorative circles */}
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: '#C83C64' }} />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ backgroundColor: '#ffffff' }} />

        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-lato font-semibold tracking-widest uppercase text-white/70 border border-white/20 mb-5">
          Product Guidelines
        </span>
        <h1 className="font-aloevera font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4">
          Do&apos;s &amp; Don&apos;ts
        </h1>
        <p className="font-lato text-white/70 max-w-xl text-base md:text-lg">
          Follow these essential guidelines to ensure the longevity, safety, and performance of your Luxume roofing products.
        </p>


      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Intro card */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 mb-14 text-center">
            <p className="font-lato text-gray-600 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
              Proper handling and storage of roofing sheets significantly impacts product performance and lifespan.
              These guidelines have been prepared to help you get the best out of Luxume products.
            </p>
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Do's */}
            <div className="rounded-2xl overflow-hidden border border-green-100 shadow-sm">
              {/* Column header */}
              <div className="flex items-center gap-3 px-6 py-5" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}>
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-aloevera font-bold text-2xl md:text-3xl text-green-700">Do&apos;s</h2>
              </div>

              {/* Items */}
              <div className="bg-white divide-y divide-gray-50">
                {dos.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 px-6 py-5 hover:bg-green-50/40 transition-colors">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-green-400 flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="font-lato text-gray-700 text-sm md:text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Don'ts */}
            <div className="rounded-2xl overflow-hidden border border-red-100 shadow-sm">
              {/* Column header */}
              <div className="flex items-center gap-3 px-6 py-5" style={{ background: 'linear-gradient(135deg, #fff1f2, #ffe4e6)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#C83C64' }}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="font-aloevera font-bold text-2xl md:text-3xl" style={{ color: '#C83C64' }}>Don&apos;ts</h2>
              </div>

              {/* Items */}
              <div className="bg-white divide-y divide-gray-50">
                {donts.map((item, i) => (
                  <div key={i} className="flex items-start gap-4 px-6 py-5 hover:bg-red-50/40 transition-colors">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center mt-0.5" style={{ borderColor: '#C83C64' }}>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#C83C64' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                    <p className="font-lato text-gray-700 text-sm md:text-base leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div
            className="mt-14 rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
            style={{ background: 'linear-gradient(135deg, #1a1b4b, #2d2f6b)' }}
          >
            <div>
              <h3 className="font-aloevera font-bold text-xl md:text-2xl text-white mb-2">
                Have questions about product care?
              </h3>
              <p className="font-lato text-white/60 text-sm">
                Our team is ready to help you with any installation or maintenance queries.
              </p>
            </div>
            <Link
              href="/contact"
              className="flex-shrink-0 inline-block px-8 py-3 rounded-xl font-lato font-semibold text-sm text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#C83C64' }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
