'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { FaStar, FaUserCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTestimonials } from '@/hooks/useTestimonials';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper to detect YouTube URLs and return embed URL
function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  let videoId = null;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtube.com') && parsed.pathname === '/watch') {
      videoId = parsed.searchParams.get('v');
    } else if (parsed.hostname === 'youtu.be') {
      videoId = parsed.pathname.slice(1);
    } else if (parsed.hostname.includes('youtube.com') && parsed.pathname.startsWith('/embed/')) {
      videoId = parsed.pathname.split('/embed/')[1];
    }
  } catch {
    return null;
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [hoveredTextIndex, setHoveredTextIndex] = useState(null);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch testimonials from Supabase
  const { data: allTestimonials = [], isLoading } = useTestimonials();

  // Split by type
  const testimonials = allTestimonials.filter(t => t.type === 'video');
  const textTestimonials = allTestimonials.filter(t => t.type === 'text');

  // Spotlight hover effect
  const handleMouseMove = useCallback((e, index) => {
    const card = e.currentTarget;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const spotX = (x / rect.width) * 100;
    const spotY = (y / rect.height) * 100;
    card.style.background = `radial-gradient(circle at ${spotX}% ${spotY}%, rgba(200, 60, 100, 0.05) 0%, rgba(255,255,255,1) 50%)`;
  }, []);

  const handleMouseLeaveCard = useCallback((e) => {
    e.currentTarget.style.background = '#FFFFFF';
    setHoveredTextIndex(null);
  }, []);


  const handleNext = () => {
    animateTransition(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    });
  };

  const handlePrev = () => {
    animateTransition(() => {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    });
  };

  const animateTransition = (updateState) => {
    if (!contentRef.current) {
      updateState();
      return;
    }
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 15,
      scale: 0.98,
      duration: 0.25,
      onComplete: () => {
        updateState();
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo(descRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeTestimonial = testimonials.length > 0 ? testimonials[activeIndex % testimonials.length] : null;

  return (
    <section ref={sectionRef} className="bg-white py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8f9fc] rounded-l-[100px] -z-10 hidden lg:block transform translate-x-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2
            ref={headingRef}
            className="aloevera-bold text-4xl sm:text-5xl md:text-[60px] mb-4"
            style={{ opacity: 0 }}
          >
            <span style={{ color: '#1C1E54' }}>Trusted by</span> <span style={{ color: '#C83C64' }}>Millions</span>
          </h2>
          <p ref={descRef} className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mt-4 sm:mt-6" style={{ opacity: 0 }}>
            Hear firsthand experiences from our valued customers about the undeniable strength and premium finish of Luxume roofing sheets.
          </p>
        </div>

        {/* Video Player Display */}
        {testimonials.length > 0 && (
          <div className="relative max-w-4xl mx-auto">
            <div
              ref={contentRef}
              className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <div className="aspect-[16/9] w-full bg-gray-900 group">
                {getYouTubeEmbedUrl(activeTestimonial?.video_url) ? (
                  <iframe
                    key={activeTestimonial?.video_url}
                    src={getYouTubeEmbedUrl(activeTestimonial?.video_url)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`Testimonial video`}
                  />
                ) : (
                  <video
                    key={activeTestimonial?.video_url}
                    className="w-full h-full object-cover"
                    controls
                    preload="metadata"
                  >
                    <source src={activeTestimonial?.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-3 lg:px-0 lg:-mx-16 pointer-events-none">
              <button
                onClick={handlePrev}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center text-gray-800 hover:text-[#C83C64] hover:scale-110 transition-all pointer-events-auto border border-gray-100"
                aria-label="Previous video"
              >
                <FaChevronLeft className="text-lg sm:text-xl ml-[-2px]" />
              </button>
              <button
                onClick={handleNext}
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center justify-center text-gray-800 hover:text-[#C83C64] hover:scale-110 transition-all pointer-events-auto border border-gray-100"
                aria-label="Next video"
              >
                <FaChevronRight className="text-lg sm:text-xl mr-[-2px]" />
              </button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (activeIndex !== idx) {
                      animateTransition(() => setActiveIndex(idx));
                    }
                  }}
                  className={`transition-all duration-300 rounded-full ${activeIndex === idx ? 'w-8 h-2.5 bg-[#C83C64]' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Text Testimonials — Swiper Carousel */}
      <div className="text-testimonials-carousel mt-20 md:mt-28 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        {/* Section sub-heading + arrows */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h3 className="aloevera-bold text-2xl sm:text-3xl md:text-4xl" style={{ color: '#1C1E54' }}>
              What Our Clients Say
            </h3>
            <p className="text-gray-500 text-sm mt-2">Swipe or use arrows to explore more reviews</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${isBeginning
                ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                : 'border-gray-200 text-[#1C1E54] hover:bg-[#C83C64] hover:text-white hover:border-[#C83C64] hover:shadow-lg'
                }`}
              aria-label="Previous testimonials"
            >
              <FaChevronLeft className="text-base" />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${isEnd
                ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                : 'border-gray-200 text-[#1C1E54] hover:bg-[#C83C64] hover:text-white hover:border-[#C83C64] hover:shadow-lg'
                }`}
              aria-label="Next testimonials"
            >
              <FaChevronRight className="text-base" />
            </button>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            const pages = swiper.snapGrid.length;
            setTotalPages(pages);
            setCurrentPage(1);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
            setCurrentPage(swiper.snapIndex + 1);
          }}
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 32 },
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={false}
          loop={false}
          style={{ paddingBottom: '16px', paddingTop: '8px' }}
        >
          {textTestimonials.map((testimonial, index) => (
            <SwiperSlide key={index} style={{ height: 'auto' }}>
              <div
                className="testimonial-inner flex flex-col bg-white p-6 sm:p-8 rounded-2xl cursor-pointer h-full"
                style={{
                  boxShadow: hoveredTextIndex === index
                    ? '0 20px 40px rgba(200, 60, 100, 0.15), 0 4px 12px rgba(0,0,0,0.05)'
                    : '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: hoveredTextIndex === index
                    ? '1.5px solid #C83C64'
                    : '1px solid #F5F5F5',
                  transform: hoveredTextIndex === index ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
                onMouseEnter={() => setHoveredTextIndex(index)}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={handleMouseLeaveCard}
              >
                {/* Quote Icon */}
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center mb-4"
                  style={{
                    background: '#C83C64',
                    borderRadius: '20px',
                    transform: hoveredTextIndex === index ? 'scale(1.1) rotate(10deg)' : 'scale(1) rotate(0deg)',
                    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 3C15.4696 3 14.9609 3.21071 14.5858 3.58579C14.2107 3.96086 14 4.46957 14 5V11C14 11.5304 14.2107 12.0391 14.5858 12.4142C14.9609 12.7893 15.4696 13 16 13C16.2652 13 16.5196 13.1054 16.7071 13.2929C16.8946 13.4804 17 13.7348 17 14V15C17 15.5304 16.7893 16.0391 16.4142 16.4142C16.0391 16.7893 15.5304 17 15 17C14.7348 17 14.4804 17.1054 14.2929 17.2929C14.1054 17.4804 14 17.7348 14 18V20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21C16.5913 21 18.1174 20.3679 19.2426 19.2426C20.3679 18.1174 21 16.5913 21 15V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3H16Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 3C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V11C3 11.5304 3.21071 12.0391 3.58579 12.4142C3.96086 12.7893 4.46957 13 5 13C5.26522 13 5.51957 13.1054 5.70711 13.2929C5.89464 13.4804 6 13.7348 6 14V15C6 15.5304 5.78929 16.0391 5.41421 16.4142C5.03914 16.7893 4.53043 17 4 17C3.73478 17 3.48043 17.1054 3.29289 17.2929C3.10536 17.4804 3 17.7348 3 18V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C5.5913 21 7.11742 20.3679 8.24264 19.2426C9.36786 18.1174 10 16.5913 10 15V5C10 4.46957 9.78929 3.96086 9.41421 3.58579C9.03914 3.21071 8.53043 3 8 3H5Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className="text-sm sm:text-base"
                      style={{
                        color: hoveredTextIndex === index ? '#C83C64' : '#FBBF24',
                        transition: `color 0.3s ease ${i * 0.05}s`
                      }}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 flex-grow">
                  {testimonial.quote}
                </p>

                {/* Divider */}
                <div
                  className="h-1 mb-4 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #C83C64, #E91E63)',
                    width: hoveredTextIndex === index ? '64px' : '32px',
                    transition: 'width 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
                  }}
                />

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {testimonial.profile_url ? (
                      <img
                        src={testimonial.profile_url}
                        alt={testimonial.name}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                        style={{
                          border: hoveredTextIndex === index ? '2px solid #C83C64' : '2px solid #e5e7eb',
                          transform: hoveredTextIndex === index ? 'scale(1.1)' : 'scale(1)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ) : (
                      <FaUserCircle
                        className="w-10 h-10 sm:w-12 sm:h-12"
                        style={{
                          color: hoveredTextIndex === index ? '#C83C64' : '#d1d5db',
                          transform: hoveredTextIndex === index ? 'scale(1.1)' : 'scale(1)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    )}
                    {/* Verified Badge */}
                    <div
                      className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm"
                      style={{ background: '#C83C64', border: '2px solid white' }}
                    >
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h4
                      className="font-semibold text-sm sm:text-base"
                      style={{
                        color: hoveredTextIndex === index ? '#C83C64' : '#1a1a4e',
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Page indicator */}
        <div className="flex items-center justify-center gap-3 mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => {
                const swiper = swiperRef.current;
                if (swiper) swiper.slideTo(i * (swiper.params.slidesPerView || 1));
              }}
              className={`transition-all duration-300 rounded-full ${currentPage === i + 1
                ? 'w-8 h-2.5 bg-[#C83C64]'
                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}

        </div>
      </div>
    </section>
  );
}
