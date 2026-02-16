'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import CoatedSteelSection from '@/components/CoatedSteelSection';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;

  // This will be replaced with database data later
  const productData = {
    id: productId,
    name: 'Color Coated Galvalume Sheets',
    heroImage: '/images/colorful-roofing-tiles.png',
    colors: [
      { name: 'Brick Red', image: '/images/image 12.png', houseImage: '/images/home.png' },
      { name: 'Pepsi Blue', image: '/images/image 13.png', houseImage: '/images/home2.png' },
      { name: 'Pencil Grey', image: '/images/image 14.png', houseImage: '/images/home3.png' },
      { name: 'Wine Red', image: '/images/image 15.png', houseImage: '/images/home4.png' },
      { name: 'Coffee Brown', image: '/images/image 16.png', houseImage: '/images/home.png' },
      { name: 'Caulfield Green', image: '/images/image 17.png', houseImage: '/images/home2.png' },
      { name: 'Leaf Green', image: '/images/image 18.png', houseImage: '/images/home3.png' },
      { name: 'Off White', image: '/images/image 19.png', houseImage: '/images/home4.png' },
      { name: 'Black', image: '/images/image 20.png', houseImage: '/images/home.png' },
      { name: 'Turquoise Green', image: '/images/image 21.png', houseImage: '/images/home2.png' },
    ],
    profileTypes: [
      { 
        name: '6-Crest Double Ribbed Trapezoidal Profile', 
        image: '/images/corrugated-roofing-panels.webp',
        description: 'Engineered for maximum structural strength, ideal for large-span industrial warehouses and commercial roofing.',
        features: [
          'High load-bearing capacity for heavy snow/wind',
          'Double-ribbed design for anti-capillary protection',
          '1000mm standard effective coverage'
        ]
      },
      { 
        name: '5-Crest Double Ribbed Trapezoidal Profile', 
        image: '/images/precision-roofing-panels.webp',
        description: 'The 5-crest trapezoidal profile offers a balanced combination of strength and material efficiency.',
        features: [
          'Cost-efficient roofing solution',
          'Reliable structural performance',
          'Suitable for industrial and infrastructure projects'
        ]
      },
      { 
        name: 'Cladding Sheet Profile', 
        image: '/images/industrial-steel-sheets.webp',
        description: 'Luxume cladding profiles are designed for wall applications, providing a sleek appearance along with protection against external elements.',
        features: [
          'Clean and uniform surface finish',
          'Ideal for industrial and commercial wall cladding',
          'Designed for long-term exterior performance'
        ]
      },
    ],
    paintFinishOptions: [
      { 
        name: 'PVDF', 
        fullName: 'Polyvinylidene Fluoride',
        durability: '20-25 years',
        description: 'Premium fluoropolymer coating offering exceptional weather resistance and color retention.',
        features: ['UV Resistant', 'High Gloss', 'Self-Cleaning'],
        bestFor: 'Coastal & Industrial'
      },
      { 
        name: 'PVDF', 
        fullName: 'Polyvinylidene Fluoride',
        durability: '20-25 years',
        description: 'Premium fluoropolymer coating offering exceptional weather resistance and color retention.',
        features: ['UV Resistant', 'High Gloss', 'Self-Cleaning'],
        bestFor: 'Coastal & Industrial'
      },
      { 
        name: 'PVDF', 
        fullName: 'Polyvinylidene Fluoride',
        durability: '20-25 years',
        description: 'Premium fluoropolymer coating offering exceptional weather resistance and color retention.',
        features: ['UV Resistant', 'High Gloss', 'Self-Cleaning'],
        bestFor: 'Coastal & Industrial'
      },
      { 
        name: 'PVDF', 
        fullName: 'Polyvinylidene Fluoride',
        durability: '20-25 years',
        description: 'Premium fluoropolymer coating offering exceptional weather resistance and color retention.',
        features: ['UV Resistant', 'High Gloss', 'Self-Cleaning'],
        bestFor: 'Coastal & Industrial'
      },
    ]
  };

  // State to track the selected color index
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative mx-auto" style={{ height: '730px', width: 'calc(100% - 4rem)', marginTop: '2rem', marginLeft: '2rem', marginRight: '2rem', borderRadius: '30px', overflow: 'hidden' }}>
        <Image
          src="/images/products-detail-hero.png"
          alt="Luxume Roofing - Premium roofing solutions"
          fill
          priority
          className="object-cover"
          style={{ borderRadius: '30px' }}
        />
      </section>

      {/* A Synonym for Excellence Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className="font-aloevera text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12" style={{ color: '#1a1b4b' }}>
            Colour Coated Galvalume Sheets
          </h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Description */}
            <div>
              <h3 className="font-aloevera text-2xl md:text-3xl font-bold mb-6" style={{ color: '#C83C64' }}>
                A Synonym for Excellence
              </h3>
              <p className="font-lato text-gray-700 leading-relaxed text-base">
                Luxume Roofing - A Synonym for Excellence With a legacy of over one and a half decades and unmatched quality, Luxume Roofing has become a synonym of excellence in aluminum-zinc color-coated sheets. What sets Luxume Roofing apart is its construction using pure steel, advanced high-quality paint technology, resistance to rust, and the strength to withstand diverse weather conditions.
              </p>
            </div>

            {/* Right Side - Specifications Table */}
            <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="py-3 px-4 font-lato font-semibold text-gray-800 bg-gray-50">
                      Thickness
                    </td>
                    <td className="py-3 px-4 font-lato text-gray-700">
                      0.35, 0.40, 0.45, 0.50 mm
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-3 px-4 font-lato font-semibold text-gray-800 bg-gray-50">
                      Strength
                    </td>
                    <td className="py-3 px-4 font-lato text-gray-700">
                      550 MPa (High Tensile)
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-3 px-4 font-lato font-semibold text-gray-800 bg-gray-50">
                      Coating
                    </td>
                    <td className="py-3 px-4 font-lato text-gray-700">
                      AZ 70 GSM, AZ 150 GSM
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-3 px-4 font-lato font-semibold text-gray-800 bg-gray-50">
                      Material
                    </td>
                    <td className="py-3 px-4 font-lato text-gray-700">
                      Premium quality aluminum-zinc coated galvanized steel
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-3 px-4 font-lato font-semibold text-gray-800 bg-gray-50">
                      Paint Coating
                    </td>
                    <td className="py-3 px-4 font-lato text-gray-700">
                      5-layer high-performance paint system
                    </td>
                  </tr>
                  <tr className="border-b border-gray-300">
                    <td className="py-3 px-4 font-lato font-semibold text-gray-800 bg-gray-50">
                      Width
                    </td>
                    <td className="py-3 px-4 font-lato text-gray-700">
                      1100 mm, 1130 mm
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-lato font-semibold text-gray-800 bg-gray-50">
                      Profile Finish
                    </td>
                    <td className="py-3 px-4 font-lato text-gray-700">
                      Optional
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Wide Range of Colours Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="font-aloevera text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#C83C64' }}>
              Wide Range of Colours
            </h2>
            <p className="font-lato text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
              Choose from our extensive palette of premium finishes, designed to complement any architectural style while providing superior protection and longevity.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Side - House Image (Interactive) */}
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={productData.colors[selectedColorIndex].houseImage}
                alt="Beautiful house with colored roofing"
                fill
                className="object-cover transition-all duration-500"
              />
            </div>

            {/* Right Side - Color Swatches Grid */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {productData.colors.map((color, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => setSelectedColorIndex(index)}
                  >
                    <div className={`w-full aspect-[3/2] mb-2 relative overflow-hidden transition-all duration-300 group-hover:scale-105 ${
                      selectedColorIndex === index ? 'scale-105' : ''
                    }`}>
                      <Image
                        src={color.image}
                        alt={color.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className={`font-lato text-center text-sm font-medium transition-colors ${
                      selectedColorIndex === index ? 'text-pink-600 font-bold' : 'text-gray-800'
                    }`}>
                      {color.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Types Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-aloevera text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#C83C64' }}>
              Profile Types
            </h2>
            <p className="font-lato text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
              Precision-engineered roofing and cladding solutions designed for industrial durability and architectural excellence. Explore our versatile range of trapezoidal profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productData.profileTypes.map((type, index) => (
              <div 
                key={index}
                className="bg-white overflow-hidden border border-gray-200 flex flex-col"
                style={{ borderRadius: '20px' }}
              >
                {/* Profile Image */}
                <div className="relative h-48 flex items-center justify-center border border-gray-200" style={{ margin: '16px 16px 0 16px', borderRadius: '30px 30px 0 0' }}>
                  <Image
                    src={type.image}
                    alt={type.name}
                    fill
                    className="object-contain p-4"
                    style={{ borderRadius: '30px 30px 0 0' }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-aloevera text-xl font-bold mb-3" style={{ color: '#1a1b4b' }}>
                    {type.name}
                  </h3>
                  <p className="font-lato text-gray-600 text-sm leading-relaxed mb-5">
                    {type.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {type.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: '#2BBAA4' }}>
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="font-lato text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button 
                    className="w-full py-3 rounded-lg text-white font-lato font-semibold text-base transition-all duration-300 hover:opacity-90"
                    style={{ backgroundColor: '#0F172B' }}
                  >
                    Request Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paint Finish Options Section */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-aloevera text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#C83C64' }}>
              Paint Finish Options
            </h2>
            <p className="font-lato text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
              Choose the right coating system for your project requirements, climate conditions, and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productData.paintFinishOptions.map((option, index) => (
              <div 
                key={index}
                className="bg-white p-6 flex flex-col"
                style={{ borderRadius: '16px' }}
              >
                {/* Header: Name + Durability Badge */}
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-aloevera text-2xl font-bold" style={{ color: '#1a1b4b' }}>
                    {option.name}
                  </h3>
                  <span 
                    className="text-xs font-lato font-semibold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: '#C83C64' }}
                  >
                    {option.durability}
                  </span>
                </div>

                {/* Full Name */}
                <p className="font-lato text-gray-500 text-sm mb-4">
                  {option.fullName}
                </p>

                {/* Description */}
                <p className="font-lato text-gray-700 text-sm leading-relaxed mb-5">
                  {option.description}
                </p>

                {/* Key Features */}
                <p className="font-lato text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  KEY FEATURES
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {option.features.map((feature, fIndex) => (
                    <span 
                      key={fIndex}
                      className="font-lato text-xs text-gray-700 border border-gray-300 rounded-full px-3 py-1.5"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Best For */}
                <div className="mt-auto">
                  <span className="font-lato text-sm text-gray-500">Best for:  </span>
                  <span className="font-lato text-sm font-bold text-gray-800">{option.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coated Steel Section */}
      <CoatedSteelSection />

      {/* Downloads & Resources Section */}
      <section className="py-16 px-4 md:px-8">
        <div 
          className="max-w-6xl mx-auto text-center py-16 px-6 md:px-12"
          style={{ 
            backgroundColor: '#1a1a2e', 
            borderRadius: '30px' 
          }}
        >
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold text-white mb-4">
            Downloads & Resources
          </h2>
          <p className="font-lato text-gray-400 max-w-2xl mx-auto text-sm md:text-base mb-10">
            Access essential documents to help you make informed decisions and ensure the best performance of Luxume roofing products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-lato font-semibold transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#C83C64' }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Product Catalogue
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-lato font-semibold transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#C83C64' }}
            >
              Do&apos;s & Don&apos;ts
            </a>
            <a 
              href="#" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-white font-lato font-semibold transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#C83C64' }}
            >
              Warranty - Terms & Conditions
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
