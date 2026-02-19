'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import CoatedSteelSection from '@/components/CoatedSteelSection';
import { getProductBySlug } from '@/services/supabase/products.service';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to track the selected color index
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [hoveredProfileIndex, setHoveredProfileIndex] = useState(null);
  const [hoveredPaintIndex, setHoveredPaintIndex] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const { data, error: fetchError } = await getProductBySlug(slug);
      if (fetchError) {
        setError(fetchError);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#C83C64' }}></div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-aloevera text-2xl font-bold mb-2" style={{ color: '#1a1b4b' }}>Product Not Found</h2>
          <p className="font-lato text-gray-600">{error || 'The product you are looking for does not exist.'}</p>
        </div>
      </main>
    );
  }

  // Map DB fields to local variables for the template
  const title = product.title;
  const section1Header = product.section1_header;
  const section1Description = product.section1_description;
  const profileTypes = product.profile_types || [];
  const paintFinishOptions = product.paint_finish_options || [];

  // Hardcoded colors (kept as-is since not from DB yet)
  const colors = [
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
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden" style={{ height: '730px' }}>
        <Image
          src="/images/products-detail-hero.png"
          alt="Luxume Roofing - Premium roofing solutions"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55"></div>
      </section>

      {/* A Synonym for Excellence Section */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className="font-aloevera text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12" style={{ color: '#1a1b4b' }}>
            {title}
          </h2>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Description */}
            <div>
              <h3 className="font-aloevera text-2xl md:text-3xl font-bold mb-6" style={{ color: '#C83C64' }}>
                {section1Header}
              </h3>
              <p className="font-lato text-gray-700 leading-relaxed text-base">
                {section1Description}
              </p>
            </div>

            {/* Right Side - Specifications Table */}
            {product.specifications && (
              <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody>
                    {Object.entries(product.specifications).map(([key, value], index, arr) => (
                      <tr key={key} className={index < arr.length - 1 ? 'border-b border-gray-300' : ''}>
                        <td className="py-3 px-4 font-lato font-semibold text-gray-800 bg-gray-50">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        </td>
                        <td className="py-3 px-4 font-lato text-gray-700">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
                src={colors[selectedColorIndex].houseImage}
                alt="Beautiful house with colored roofing"
                fill
                className="object-cover transition-all duration-500"
              />
            </div>

            {/* Right Side - Color Swatches Grid */}
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {colors.map((color, index) => (
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
            {profileTypes.map((type, index) => (
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
                <div className="relative h-48 flex items-center justify-center border border-gray-200" style={{ margin: '16px 16px 0 16px', borderRadius: '30px 30px 0 0' }}>
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className="object-contain p-4"
                    style={{ borderRadius: '30px 30px 0 0' }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="lato-medium text-[20px] mb-3" style={{ color: '#0F172B' }}>
                    {type.title}
                  </h3>
                  <p className="font-lato text-gray-600 text-sm leading-relaxed mb-5">
                    {type.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6 flex-1">
                    {(type.points || []).map((feature, fIndex) => (
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
            {paintFinishOptions.map((option, index) => (
              <div 
                key={index}
                className="bg-white p-6 flex flex-col transition-all duration-300 cursor-default"
                style={{ 
                  borderRadius: '16px', 
                  boxShadow: hoveredPaintIndex === index ? '0 12px 28px rgba(231, 0, 11, 0.2), 0 4px 12px rgba(0,0,0,0.05)' : '0px 0px 15px 0px #0000001A',
                  border: hoveredPaintIndex === index ? '1.5px solid #E7000B' : '1px solid transparent',
                  transform: hoveredPaintIndex === index ? 'translateY(-6px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredPaintIndex(index)}
                onMouseLeave={() => setHoveredPaintIndex(null)}
              >
                {/* Header: Name + Durability Badge */}
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-aloevera text-2xl font-bold" style={{ color: '#E7000B' }}>
                    {option.title}
                  </h3>
                  <span 
                    className="text-xs font-lato font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: '#FEF2F2', color: '#E7000B' }}
                  >
                    {option.time_span_range}
                  </span>
                </div>

                {/* Full Name */}
                <p className="font-lato text-sm mb-4" style={{ color: '#4A5565' }}>
                  {option.subtitle}
                </p>

                {/* Description */}
                <p className="font-lato text-sm leading-relaxed mb-5" style={{ color: '#364153' }}>
                  {option.description}
                </p>

                {/* Key Features */}
                <p className="font-lato text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#6A7282' }}>
                  KEY FEATURES
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(option.features || []).map((feature, fIndex) => (
                    <span 
                      key={fIndex}
                      className="font-lato text-xs rounded-full px-3 py-1.5"
                      style={{ color: '#364153', backgroundColor: '#F3F4F6' }}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Separator */}
                <hr style={{ borderColor: '#E5E7EB' }} className="mb-4" />

                {/* Best For */}
                <div className="mt-auto flex items-center gap-2">
                  <span className="font-lato text-sm" style={{ color: '#6A7282' }}>Best for:</span>
                  <span className="font-lato text-sm font-bold rounded-full" style={{ color: '#101828' }}>{option.best_for}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="relative px-4 md:px-8" style={{ backgroundColor: '#C83C64', overflow: 'visible', marginTop: '8rem' }}>
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
            <div className="flex flex-col justify-center px-6 md:px-10 py-20 lg:py-28">
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
