'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
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
            className="font-aloevera font-bold text-4xl sm:text-5xl mb-4 text-[#C83C64]"
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
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0a0a2e' }}
                >
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <div>
                  <h3 className="font-lato font-semibold text-gray-800 mb-2">Visit Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Luxume Manufacturing Facility<br />
                    Industrial Park, Sector 42<br />
                    Mumbai, Maharashtra 400001<br />
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
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0a0a2e' }}
                >
                  <FaPhone className="text-white" />
                </div>
                <div>
                  <h3 className="font-lato font-semibold text-gray-800 mb-2">Call Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Sales: +91 22 1234 5678<br />
                    Support: +91 22 8765 4321<br />
                    Toll Free: 1800 123 4567
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
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0a0a2e' }}
                >
                  <FaEnvelope className="text-white" />
                </div>
                <div>
                  <h3 className="font-lato font-semibold text-gray-800 mb-2">Email Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    info@luxume.com<br />
                    sales@luxume.com<br />
                    support@luxume.com
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
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#0a0a2e' }}
                >
                  <FaClock className="text-white" />
                </div>
                <div>
                  <h3 className="font-lato font-semibold text-gray-800 mb-2">Business Hours</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 9:00 AM - 2:00 PM<br />
                    Sunday: Closed
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
            
            {/* Status Messages */}
            {submitStatus.message && (
              <div
                className={`mb-6 p-4 rounded-lg text-sm ${
                  submitStatus.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

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
