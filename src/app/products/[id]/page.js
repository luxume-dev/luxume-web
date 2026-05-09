'use client';

import { useParams } from 'next/navigation';
import { useState, useRef } from 'react';
import Image from 'next/image';
import CoatedSteelSection from '@/components/CoatedSteelSection';
import { useProduct } from '@/hooks/useProducts';
import RequestQuoteModal from '@/components/RequestQuoteModal';
import DownloadsAndResources from '@/components/DownloadsAndResources';
import * as LucideIcons from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.id;

  const { data: brand, isLoading, error } = useProduct(slug);

  // State to track the selected color index
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [hoveredProfileIndex, setHoveredProfileIndex] = useState(null);

  // Quote modal state
  const [quoteModal, setQuoteModal] = useState({ isOpen: false, profileType: '' });
  const openQuote = (profileTitle) => setQuoteModal({ isOpen: true, profileType: profileTitle });
  const closeQuote = () => setQuoteModal({ isOpen: false, profileType: '' });

  // Ref for the house image — used for mobile scroll-to-image on color pick
  const houseImageRef = useRef(null);

  const handleColorSelect = (index) => {
    setSelectedColorIndex(index);
    // On mobile (below lg breakpoint), scroll to the image so user can see the result
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setTimeout(() => {
        houseImageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
    }
  };

  if (isLoading) {
    return (
      <main className="bg-white overflow-hidden">
        {/* Shimmer keyframe */}
        <style>{`
          @keyframes shimmer {
            0%   { background-position: -800px 0; }
            100% { background-position:  800px 0; }
          }
          .shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 800px 100%;
            animation: shimmer 1.4s infinite linear;
            border-radius: 8px;
          }
        `}</style>
        <div className="shimmer w-full" style={{ height: '400px', borderRadius: 0 }} />
        
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="shimmer h-12 w-2/5 mx-auto mb-12" />
            <div className="shimmer h-8 w-3/5" />
            <div className="shimmer h-4 w-full mt-4" />
            <div className="shimmer h-4 w-5/6 mt-4" />
          </div>
        </section>
      </main>
    );
  }

  if (error || !brand) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-aloevera text-2xl font-bold mb-2" style={{ color: '#1a1b4b' }}>Product Not Found</h2>
          <p className="font-lato text-gray-600">{error?.message || 'The product you are looking for does not exist.'}</p>
        </div>
      </main>
    );
  }

  // Map DB fields to local variables for the template
  const title = brand.title;
  const description = brand.description;
  const coverImage = brand.cover_image_url;
  const features = Array.isArray(brand.features) ? brand.features : [];
  const specifications = Array.isArray(brand.specification) ? brand.specification : [];
  const profiles = brand.profiles || [];

  const colors = [
    { name: 'Brick Red', image: '/images/image 12.png', houseImage: '/images/roof-images/brick-red.webp' },
    { name: 'Pepsi Blue', image: '/images/image 13.png', houseImage: '/images/roof-images/pepsi-blue.webp' },
    { name: 'Pencil Grey', image: '/images/image 14.png', houseImage: '/images/roof-images/pencil-grey.webp' },
    { name: 'Wine Red', image: '/images/image 15.png', houseImage: '/images/roof-images/wine-red.webp' },
    { name: 'Coffee Brown', image: '/images/image 16.png', houseImage: '/images/roof-images/coffee-brown.webp' },
    { name: 'Caulfield Green', image: '/images/image 17.png', houseImage: '/images/roof-images/caulfield-green.webp' },
    { name: 'Leaf Green', image: '/images/image 18.png', houseImage: '/images/roof-images/leaf-green.webp' },
    { name: 'Off White', image: '/images/image 19.png', houseImage: '/images/roof-images/off-white.webp' },
    { name: 'Black', image: '/images/image 20.png', houseImage: '/images/roof-images/black.webp' },
    { name: 'Turquoise Green', image: '/images/image 21.png', houseImage: '/images/roof-images/turquoise-green.webp' },
  ];

  return (
    <main className="bg-white">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[40vh] min-h-[350px] bg-gray-900 md:rounded-b-[40px] md:overflow-hidden">
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover opacity-70"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="font-aloevera text-3xl md:text-5xl lg:text-6xl font-bold text-white">
              {title}
            </h1>
          </div>
        </div>
      </section>

      {/* 2. Description Section */}
      {description && (
        <section className="py-16 px-4 md:px-8 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-12">
            <p className="font-lato text-gray-700 leading-relaxed text-lg md:text-xl max-w-4xl relative z-10">
              {description}
            </p>
            {/* Desktop-only decorative icon in the remaining space */}
            <div className="hidden lg:flex flex-1 justify-center items-center text-[#C83C64] opacity-10">
              <LucideIcons.Quote size={160} />
            </div>
          </div>
        </section>
      )}

      {/* 3. Key Features and Benefits */}
      {features.length > 0 && (
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h3 className="font-lato text-sm font-bold uppercase tracking-wider text-[#C83C64] mb-2">
                Key Features & Benefits
              </h3>
              <h2 className="font-aloevera text-3xl md:text-4xl font-bold" style={{ color: '#1a1b4b' }}>
                Why choose {title}?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = LucideIcons[feature.icon] || LucideIcons.CheckCircle;
                return (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: '#FEF2F2', color: '#C83C64' }}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-aloevera text-xl font-bold mb-3" style={{ color: '#1a1b4b' }}>
                      {feature.title}
                    </h3>
                    <p className="font-lato text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. Wide Range of Colours Section */}
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
            <div ref={houseImageRef} className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={colors[selectedColorIndex].houseImage}
                alt="Beautiful house with colored roofing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-500"
              />
            </div>

            {/* Right Side - Color Swatches Grid */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center group cursor-pointer"
                    onClick={() => handleColorSelect(index)}
                  >
                    <div className={`w-full aspect-[3/2] mb-2 relative overflow-hidden transition-all duration-300 group-hover:scale-105 ${selectedColorIndex === index ? 'scale-105' : ''
                      }`}>
                      <Image
                        src={color.image}
                        alt={color.name}
                        fill
                        sizes="(max-width: 768px) 33vw, 25vw"
                        className="object-contain"
                      />
                    </div>
                    <p className={`font-lato text-center text-sm font-medium transition-colors ${selectedColorIndex === index ? 'text-pink-600 font-bold' : 'text-gray-800'
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

      {/* 5. Profile Types Section */}
      {profiles.length > 0 && (
        <section className="py-16 px-4 md:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-aloevera text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#C83C64' }}>
                Profile Types
              </h2>
              <p className="font-lato text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
                Explore the variety of profiles available for {title}, engineered for strength, aesthetic appeal, and performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {profiles.map((profile, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden flex flex-col transition-all duration-300 cursor-default"
                  style={{
                    borderRadius: '20px',
                    border: hoveredProfileIndex === index ? '1.5px solid #C83C64' : '1px solid #E5E7EB',
                    boxShadow: hoveredProfileIndex === index ? '0 12px 28px rgba(200, 60, 100, 0.2), 0 4px 12px rgba(0,0,0,0.05)' : 'none',
                    transform: hoveredProfileIndex === index ? 'translateY(-6px)' : 'translateY(0)'
                  }}
                  onMouseEnter={() => setHoveredProfileIndex(index)}
                  onMouseLeave={() => setHoveredProfileIndex(null)}
                >
                  {/* Profile Image */}
                  <div className="relative h-48 flex items-center justify-center border border-gray-200 overflow-hidden" style={{ margin: '16px 16px 0 16px', borderRadius: '30px 30px 0 0' }}>
                    {profile.image_url ? (
                      <Image
                        src={profile.image_url}
                        alt={profile.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        style={{ borderRadius: '30px 30px 0 0' }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 rounded-t-[30px]">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="lato-medium text-[20px] mb-3" style={{ color: '#0F172B' }}>
                      {profile.title}
                    </h3>
                    <p className="font-lato text-gray-600 text-sm leading-relaxed mb-6 flex-1">
                      {profile.description}
                    </p>

                    {/* CTA Button */}
                    <button
                      onClick={() => openQuote(profile.title)}
                      className="w-full py-3 rounded-lg text-white font-lato font-semibold text-base transition-all duration-300 hover:opacity-90 mt-auto"
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
      )}

      {/* 6. Technical Specifications Section */}
      {specifications.length > 0 && (
        <section className="py-16 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10 text-center">
              <h2 className="font-aloevera text-3xl md:text-4xl font-bold" style={{ color: '#1a1b4b' }}>
                Technical Specifications
              </h2>
            </div>
            <div className="overflow-x-auto border-2 border-gray-100 rounded-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-100">
                    <th className="py-4 px-6 font-lato font-bold text-gray-700 uppercase tracking-wider text-sm">Parameter</th>
                    <th className="py-4 px-6 font-lato font-bold text-gray-700 uppercase tracking-wider text-sm">UOM</th>
                    <th className="py-4 px-6 font-lato font-bold text-gray-700 uppercase tracking-wider text-sm">Specification</th>
                  </tr>
                </thead>
                <tbody>
                  {specifications.map((spec, idx) => (
                    <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-lato text-gray-800 font-medium">{spec.parameter}</td>
                      <td className="py-4 px-6 font-lato text-gray-600">{spec.uom}</td>
                      <td className="py-4 px-6 font-lato text-gray-600">{spec.specification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* 7. Contact CTA Section */}
      <section className="relative px-4 md:px-8 md:mt-6 lg:mt-16 xl:mt-32" style={{ backgroundColor: '#C83C64', overflow: 'visible' }}>
        {/* Image - absolutely positioned at the very bottom-left, ignoring padding */}
        <div className="hidden lg:block absolute bottom-0 left-0" style={{ width: '50%', zIndex: 1 }}>
          <img
            src="/images/contact-section-product.webp"
            alt="Luxume roofing products showcase"
            style={{
              maxHeight: '620px',
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative" style={{ zIndex: 2 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left spacer for the absolutely positioned image */}
            <div className="hidden lg:block" />

            {/* Right Side - Text & CTA */}
            <div className="flex flex-col justify-center px-6 md:px-10 py-10 md:py-14 lg:py-14 xl:py-28">
              <h2 className="font-aloevera text-2xl md:text-3xl lg:text-[2.25rem] font-medium text-white leading-tight mb-4" style={{ fontStyle: 'italic' }}>
                Ready to enhance the aesthetic appeal of your buildings?
              </h2>
              <p className="font-lato text-white/80 text-sm md:text-base mb-8 max-w-md">
                For inquiries, orders, or to learn more about our products and services
              </p>
              <div>
                <a
                  href="/contact"
                  className="inline-block px-10 py-3.5 rounded-[16px] font-lato font-semibold text-sm md:text-base transition-all duration-300 hover:shadow-lg hover:scale-105"
                  style={{ backgroundColor: '#ffffff', color: '#C83C64' }}
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Coated Steel Section */}
      <CoatedSteelSection />

      {/* 9. Downloads & Resources Section */}
      <DownloadsAndResources />

      {/* Request Quote Modal */}
      <RequestQuoteModal
        isOpen={quoteModal.isOpen}
        onClose={closeQuote}
        productName={title}
        profileType={quoteModal.profileType}
      />
    </main>
  );
}
