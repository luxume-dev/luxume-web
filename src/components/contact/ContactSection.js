'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContactForm } from '@/hooks/useContactForm';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const {
    formData,
    isLoading,
    submitStatus,
    handleChange,
    handleSubmit,
  } = useContactForm();

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRefs = useRef([]);
  const iconRefs = useRef([]);
  const formContainerRef = useRef(null);
  const formFieldRefs = useRef([]);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── Heading reveal animation ──
      gsap.fromTo(headingRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Subtitle fade in ──
      gsap.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Contact info cards — staggered slide-in from left ──
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(card,
          {
            opacity: 0,
            x: -80,
            rotateY: 15,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 0.7,
            delay: index * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Icon circles — scale pop with bounce ──
      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;

        gsap.fromTo(icon,
          {
            scale: 0,
            rotate: -180,
          },
          {
            scale: 1,
            rotate: 0,
            duration: 0.6,
            delay: 0.3 + index * 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: icon,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // ── Form container — slide in from right ──
      gsap.fromTo(formContainerRef.current,
        {
          opacity: 0,
          x: 100,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Form fields — staggered fade-in from bottom ──
      gsap.fromTo(formFieldRefs.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Submit button — pop in ──
      gsap.fromTo(buttonRef.current,
        {
          opacity: 0,
          scale: 0.8,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          delay: 0.6,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: formContainerRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );

      // ── Floating animation on icon circles (continuous) ──
      iconRefs.current.forEach((icon, index) => {
        if (!icon) return;
        gsap.to(icon, {
          y: -4,
          duration: 1.5 + index * 0.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: index * 0.3,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 mt-10">
          <h1 
            ref={headingRef}
            className="aloevera-bold text-4xl sm:text-5xl mb-4 text-[#C83C64]"
            style={{ opacity: 0 }}
          >
            Get in Touch
          </h1>
          <p 
            ref={subtitleRef}
            className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto"
            style={{ opacity: 0 }}
          >
            Have questions about our products or need technical specifications? Our team is here to help you find the right roofing solution.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left - Contact Info Cards */}
          <div className="w-full lg:w-2/5 space-y-4">
            {/* Visit Us Card */}
            <div 
              ref={el => cardRefs.current[0] = el}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-[#C83C64]/30 transition-all duration-300 cursor-default"
              style={{ opacity: 0 }}
            >
              <div className="flex gap-4">
                <div 
                  ref={el => iconRefs.current[0] = el}
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-[10px]"
                  style={{ backgroundColor: '#0F172B' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-lato font-semibold text-gray-800 mb-2">Visit Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    2nd Floor, SajMahal Building,<br />
                    Madakapilli Lane, Ernakulam South,<br />
                    Ernakulam, Kerala 682016<br />
                    India
                  </p>
                </div>
              </div>
            </div>

            {/* Call Us Card */}
            <div 
              ref={el => cardRefs.current[1] = el}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-[#C83C64]/30 transition-all duration-300 cursor-default"
              style={{ opacity: 0 }}
            >
              <div className="flex gap-4">
                <div 
                  ref={el => iconRefs.current[1] = el}
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-[10px]"
                  style={{ backgroundColor: '#0F172B' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.9994 16.92V19.92C22.0006 20.1985 21.9435 20.4741 21.832 20.7293C21.7204 20.9845 21.5567 21.2136 21.3515 21.4018C21.1463 21.5901 20.904 21.7335 20.6402 21.8227C20.3764 21.9119 20.0968 21.945 19.8194 21.92C16.7423 21.5856 13.7864 20.5341 11.1894 18.85C8.77327 17.3146 6.72478 15.2661 5.18945 12.85C3.49942 10.2412 2.44769 7.27097 2.11944 4.17997C2.09446 3.90344 2.12732 3.62474 2.21595 3.3616C2.30457 3.09846 2.44702 2.85666 2.63421 2.6516C2.82141 2.44653 3.04925 2.28268 3.30324 2.1705C3.55722 2.05831 3.83179 2.00024 4.10945 1.99997H7.10945C7.59475 1.9952 8.06524 2.16705 8.43321 2.48351C8.80118 2.79996 9.04152 3.23942 9.10944 3.71997C9.23607 4.68004 9.47089 5.6227 9.80945 6.52997C9.94399 6.8879 9.97311 7.27689 9.89335 7.65086C9.8136 8.02482 9.62831 8.36809 9.35944 8.63998L8.08945 9.90997C9.513 12.4135 11.5859 14.4864 14.0894 15.91L15.3594 14.64C15.6313 14.3711 15.9746 14.1858 16.3486 14.1061C16.7225 14.0263 17.1115 14.0554 17.4694 14.19C18.3767 14.5285 19.3194 14.7634 20.2794 14.89C20.7652 14.9585 21.2088 15.2032 21.526 15.5775C21.8431 15.9518 22.0116 16.4296 21.9994 16.92Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-lato font-semibold text-gray-800 mb-2">Call Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    +91 97785 57752
                  </p>
                </div>
              </div>
            </div>

            {/* Email Us Card */}
            <div 
              ref={el => cardRefs.current[2] = el}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-[#C83C64]/30 transition-all duration-300 cursor-default"
              style={{ opacity: 0 }}
            >
              <div className="flex gap-4">
                <div 
                  ref={el => iconRefs.current[2] = el}
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-[10px]"
                  style={{ backgroundColor: '#0F172B' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-lato font-semibold text-gray-800 mb-2">Email Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    info@luxume.com
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div 
              ref={el => cardRefs.current[3] = el}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-[#C83C64]/30 transition-all duration-300 cursor-default"
              style={{ opacity: 0 }}
            >
              <div className="flex gap-4">
                <div 
                  ref={el => iconRefs.current[3] = el}
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-[10px]"
                  style={{ backgroundColor: '#0F172B' }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6V12L16 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-lato font-semibold text-gray-800 mb-2">Business Hours</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: 9:00 AM - 2:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div 
            ref={formContainerRef}
            className="w-full lg:w-3/5 border rounded-xl px-5 py-8 sm:px-8 sm:py-10 md:px-14 md:py-14 border-gray-200 hover:shadow-xl transition-shadow duration-500"
            style={{ opacity: 0 }}
          >
            <h2 
              className="font-lato font-medium text-2xl text-[#0F172B] mb-8"
            >
              Send us a Message
            </h2>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Row 1: Full Name & Email */}
              <div 
                ref={el => formFieldRefs.current[0] = el}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                style={{ opacity: 0 }}
              >
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#C83C64] focus:ring-1 focus:ring-[#C83C64]/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    name="email_address"
                    value={formData.email_address}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#C83C64] focus:ring-1 focus:ring-[#C83C64]/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Row 2: Phone & Company */}
              <div 
                ref={el => formFieldRefs.current[1] = el}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                style={{ opacity: 0 }}
              >
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#C83C64] focus:ring-1 focus:ring-[#C83C64]/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#C83C64] focus:ring-1 focus:ring-[#C83C64]/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Subject */}
              <div 
                ref={el => formFieldRefs.current[2] = el}
                style={{ opacity: 0 }}
              >
                <label className="block text-sm text-gray-700 mb-2">Subject *</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#C83C64] focus:ring-1 focus:ring-[#C83C64]/20 transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div 
                ref={el => formFieldRefs.current[3] = el}
                style={{ opacity: 0 }}
              >
                <label className="block text-sm text-gray-700 mb-2">Message *</label>
                <textarea 
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#C83C64] focus:ring-1 focus:ring-[#C83C64]/20 transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button 
                ref={buttonRef}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-lg text-white font-medium transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#0a0a2e]/25 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
                style={{ backgroundColor: '#0a0a2e', opacity: 0 }}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
