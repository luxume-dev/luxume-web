'use client';

import { useParams } from 'next/navigation';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
    <main className="bg-white pt-20">
      {/* 1. Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[380px] bg-gray-100 md:rounded-b-[48px] md:overflow-hidden">
        {coverImage && (
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        )}
      </section>

      {/* Title & Breadcrumb */}
      <section className="pt-10 pb-4 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <p className="font-lato text-gray-500 text-sm mb-3 tracking-wide uppercase">
            <Link href="/products" className="hover:text-[#C83C64] transition-colors">Products</Link> &nbsp;/&nbsp; <span className="text-gray-900 font-semibold">{title}</span>
          </p>
          <h1 className="font-aloevera text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: '#1a1b4b' }}>
            {title}
          </h1>
          {/* Accent line */}
          <div className="mt-4 h-1 w-16 rounded-full" style={{ backgroundColor: '#C83C64' }} />
        </div>
      </section>

      {/* 2. Description Section */}
      {description && (
        <section className="py-16 px-4 md:px-8 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-12">
            <div className="relative max-w-4xl">
              {/* Left accent bar */}
              <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full" style={{ backgroundColor: '#C83C64' }} />
              <p className="font-lato text-gray-700 leading-relaxed text-lg md:text-xl pl-6">
                {description}
              </p>
            </div>
            <div className="hidden lg:flex flex-1 justify-center items-center text-[#C83C64] opacity-[0.07]">
              <LucideIcons.Quote size={180} />
            </div>
          </div>
        </section>
      )}

      {/* 3. Key Features and Benefits */}
      {features.length > 0 && (
        <section className="py-16 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
                Key Features &amp; Benefits
              </span>
              <h2 className="font-aloevera text-3xl md:text-4xl font-bold mt-2" style={{ color: '#1a1b4b' }}>
                Why choose {title}?
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = LucideIcons[feature.icon] || LucideIcons.CheckCircle;
                return (
                  <div
                    key={index}
                    className="bg-white p-7 rounded-2xl border border-gray-100 hover:border-pink-100 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: '#FEF2F2', color: '#C83C64' }}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="font-aloevera text-lg font-bold mb-2" style={{ color: '#1a1b4b' }}>
                      {feature.title}
                    </h3>
                    <p className="font-lato text-gray-500 leading-relaxed text-sm">
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
      {brand.is_colors_available && (
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-aloevera text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#C83C64' }}>
              Wide Range of Colours
            </h2>
            <p className="font-lato text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
              Choose from our extensive palette of premium finishes, designed to complement any architectural style.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* House Image */}
            <div ref={houseImageRef} className="relative h-[340px] sm:h-[420px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={colors[selectedColorIndex].houseImage}
                alt="Beautiful house with colored roofing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-all duration-500"
              />
              {/* Color name overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white font-lato text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#C83C64]" />
                  {colors[selectedColorIndex].name}
                </span>
              </div>
            </div>

            {/* Color Swatches */}
            <div className="rounded-3xl p-5 md:p-7 border border-gray-100 bg-gray-50">
              <p className="font-lato text-xs uppercase tracking-widest text-gray-400 font-semibold mb-5">
                Select a colour
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center gap-1.5 group focus:outline-none"
                    onClick={() => handleColorSelect(index)}
                    aria-label={color.name}
                  >
                    <div
                      className={`w-full aspect-square relative overflow-hidden rounded-xl transition-all duration-300 ${
                        selectedColorIndex === index
                          ? 'ring-2 ring-[#C83C64] ring-offset-2 scale-105 shadow-md'
                          : 'ring-1 ring-gray-200 group-hover:ring-[#C83C64]/50 group-hover:scale-105'
                      }`}
                    >
                      <Image
                        src={color.image}
                        alt={color.name}
                        fill
                        sizes="80px"
                        className="object-contain"
                      />
                      {selectedColorIndex === index && (
                        <div className="absolute inset-0 bg-[#C83C64]/10 flex items-center justify-center">
                          <LucideIcons.Check size={14} strokeWidth={3} className="text-[#C83C64]" />
                        </div>
                      )}
                    </div>
                    <p
                      className={`font-lato text-center text-[10px] sm:text-xs font-medium leading-tight transition-colors ${
                        selectedColorIndex === index ? 'text-[#C83C64] font-bold' : 'text-gray-600'
                      }`}
                    >
                      {color.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* 5. Profile Types Section */}
      {profiles.length > 0 && (
        <section className="py-16 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-aloevera text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#C83C64' }}>
                Profile Types
              </h2>
              <p className="font-lato text-gray-500 max-w-2xl mx-auto text-base md:text-lg">
                Explore the variety of profiles available for {title}, engineered for strength, aesthetic appeal, and performance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {profiles.map((profile, index) => (
                <div
                  key={index}
                  className="bg-white overflow-hidden flex flex-col transition-all duration-300 cursor-default"
                  style={{
                    borderRadius: '20px',
                    border: hoveredProfileIndex === index ? '1.5px solid #C83C64' : '1px solid #E5E7EB',
                    boxShadow: hoveredProfileIndex === index
                      ? '0 16px 32px rgba(200, 60, 100, 0.18), 0 4px 12px rgba(0,0,0,0.04)'
                      : '0 2px 8px rgba(0,0,0,0.04)',
                    transform: hoveredProfileIndex === index ? 'translateY(-6px)' : 'translateY(0)'
                  }}
                  onMouseEnter={() => setHoveredProfileIndex(index)}
                  onMouseLeave={() => setHoveredProfileIndex(null)}
                >
                  <div
                    className="relative h-48 overflow-hidden bg-gray-50"
                    style={{ margin: '14px 14px 0', borderRadius: '14px' }}
                  >
                    {profile.image_url ? (
                      <Image
                        src={profile.image_url}
                        alt={profile.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <LucideIcons.Image size={40} />
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-lato font-semibold text-lg mb-2" style={{ color: '#0F172B' }}>
                      {profile.title}
                    </h3>
                    <p className="font-lato text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                      {profile.description}
                    </p>
                    <button
                      onClick={() => openQuote(profile.title)}
                      className="w-full py-3 rounded-xl text-white font-lato font-semibold text-sm transition-all duration-300 hover:opacity-90 hover:shadow-md mt-auto"
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
              <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
                Details
              </span>
              <h2 className="font-aloevera text-3xl md:text-4xl font-bold mt-2" style={{ color: '#1a1b4b' }}>
                Technical Specifications
              </h2>
            </div>

            {/* Mobile: card stack */}
            <div className="flex flex-col gap-3 md:hidden">
              {specifications.map((spec, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-100 bg-gray-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <p className="font-lato font-semibold text-gray-800 text-sm leading-snug flex-1">
                      {spec.parameter}
                    </p>
                    {spec.uom && (
                      <span className="shrink-0 inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white border border-gray-200 text-gray-500">
                        {spec.uom}
                      </span>
                    )}
                  </div>
                  <p className="font-lato text-gray-600 text-sm">{spec.specification}</p>
                </div>
              ))}
            </div>

            {/* Desktop: table */}
            <div className="hidden md:block overflow-hidden border border-gray-100 rounded-2xl shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr style={{ backgroundColor: '#1a1b4b' }}>
                    <th className="py-4 px-6 font-lato font-semibold text-white/90 uppercase tracking-wider text-xs">Parameter</th>
                    <th className="py-4 px-6 font-lato font-semibold text-white/90 uppercase tracking-wider text-xs">UOM</th>
                    <th className="py-4 px-6 font-lato font-semibold text-white/90 uppercase tracking-wider text-xs">Specification</th>
                  </tr>
                </thead>
                <tbody>
                  {specifications.map((spec, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-50 transition-colors"
                      style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#fff5f7'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = idx % 2 === 0 ? '#ffffff' : '#fafafa'}
                    >
                      <td className="py-4 px-6 font-lato text-gray-800 font-medium text-sm">{spec.parameter}</td>
                      <td className="py-4 px-6 font-lato text-gray-500 text-sm">{spec.uom}</td>
                      <td className="py-4 px-6 font-lato text-gray-600 text-sm">{spec.specification}</td>
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
            src={brand.is_colors_available ? "/images/contact-section-product.webp" : "/images/cta-non-color.webp"}
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
      <CoatedSteelSection isColorsAvailable={brand.is_colors_available} />

      {/* 9. Downloads & Resources Section */}
      <DownloadsAndResources brandName={title} />

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
