'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

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
    roofingTypes: [
      { 
        name: 'Profile 1', 
        image: '/images/corrugated-roofing-panels.webp',
        description: 'Standard corrugated profile'
      },
      { 
        name: 'Profile 2', 
        image: '/images/precision-roofing-panels.webp',
        description: 'Standing seam profile'
      },
      { 
        name: 'Profile 3', 
        image: '/images/industrial-steel-sheets.webp',
        description: 'Flat panel profile'
      },
    ],
    paintFinishOptions: [
      { name: 'Glossy', description: 'High gloss finish for vibrant appearance' },
      { name: 'Matte', description: 'Non-reflective matte finish' },
      { name: 'Textured', description: 'Textured surface for enhanced grip' },
    ]
  };

  // State to track the selected color index
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section 
        className="relative pt-24 sm:pt-28 pb-16 px-4 sm:px-8"
        style={{
          backgroundImage: `url(${productData.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Dark overlay */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(10, 10, 30, 0.85)' }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto" style={{ minHeight: '200px' }}>
          {/* Empty content - just showing the background */}
        </div>
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
      <section className="py-16 px-4 md:px-8 bg-gray-50">
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
            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {productData.colors.map((color, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => setSelectedColorIndex(index)}
                  >
                    <div className={`w-full aspect-[3/2] rounded-2xl mb-2 border-2 transition-all duration-300 group-hover:border-pink-500 group-hover:shadow-xl group-hover:scale-105 relative overflow-hidden bg-white ${
                      selectedColorIndex === index ? 'border-pink-500 shadow-xl scale-105' : 'border-gray-300'
                    }`}>
                      <Image
                        src={color.image}
                        alt={color.name}
                        fill
                        className="object-cover"
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

      {/* Roofing Types Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-4" style={{ color: '#C83C64' }}>
              Roofing Types
            </h2>
            <p className="font-lato text-gray-600 max-w-3xl mx-auto">
              Multiple profile options to suit different architectural requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {productData.roofingTypes.map((type, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={type.image}
                    alt={type.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-lato text-xl font-bold text-gray-800 mb-2">
                    {type.name}
                  </h3>
                  <p className="font-lato text-gray-600 text-sm">
                    {type.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Paint Finish Options Section */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-4" style={{ color: '#C83C64' }}>
            Paint Finish Options
          </h2>
          <p className="font-lato text-gray-600 max-w-3xl mx-auto">
            Select the perfect finish for your roofing needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productData.paintFinishOptions.map((option, index) => (
            <div 
              key={index}
              className="border-2 border-gray-200 rounded-xl p-8 text-center hover:border-pink-500 transition-colors duration-300 cursor-pointer"
            >
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
                style={{ backgroundColor: '#C83C64' }}
              >
                {option.name.charAt(0)}
              </div>
              <h3 className="font-lato text-xl font-bold text-gray-800 mb-3">
                {option.name}
              </h3>
              <p className="font-lato text-gray-600 text-sm">
                {option.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Superior Protection and Style Section */}
      <section className="py-16 px-4 md:px-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-6" style={{ color: '#C83C64' }}>
            Superior Protection and Style
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="font-lato text-xl font-bold text-gray-800 mb-3">
                10+ Year Warranty
              </h3>
              <p className="font-lato text-gray-600 text-sm">
                Comprehensive warranty coverage for peace of mind
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-5xl mb-4">🌿</div>
              <h3 className="font-lato text-xl font-bold text-gray-800 mb-3">
                Eco-Friendly
              </h3>
              <p className="font-lato text-gray-600 text-sm">
                Sustainable manufacturing with recyclable materials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8" style={{ backgroundColor: '#1a1a2e' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="font-lato text-gray-300 mb-8 text-lg">
            Contact us today for a free consultation and quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              className="px-8 py-4 rounded-lg text-white font-lato font-semibold text-lg transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#C83C64' }}
            >
              Request Quote
            </button>
            <button 
              className="px-8 py-4 rounded-lg text-white font-lato font-semibold text-lg border-2 border-white hover:bg-white hover:text-gray-900 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
