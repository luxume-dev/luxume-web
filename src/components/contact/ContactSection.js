'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContactForm } from '@/hooks/useContactForm';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Contact info card kinds, as chosen in the dashboard (contact_page.info[].type)
const INFO_ICONS = {
  address: (
    <>
      <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z" />
      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" />
    </>
  ),
  phone: (
    <path d="M21.9994 16.92V19.92C22.0006 20.1985 21.9435 20.4741 21.832 20.7293C21.7204 20.9845 21.5567 21.2136 21.3515 21.4018C21.1463 21.5901 20.904 21.7335 20.6402 21.8227C20.3764 21.9119 20.0968 21.945 19.8194 21.92C16.7423 21.5856 13.7864 20.5341 11.1894 18.85C8.77327 17.3146 6.72478 15.2661 5.18945 12.85C3.49942 10.2412 2.44769 7.27097 2.11944 4.17997C2.09446 3.90344 2.12732 3.62474 2.21595 3.3616C2.30457 3.09846 2.44702 2.85666 2.63421 2.6516C2.82141 2.44653 3.04925 2.28268 3.30324 2.1705C3.55722 2.05831 3.83179 2.00024 4.10945 1.99997H7.10945C7.59475 1.9952 8.06524 2.16705 8.43321 2.48351C8.80118 2.79996 9.04152 3.23942 9.10944 3.71997C9.23607 4.68004 9.47089 5.6227 9.80945 6.52997C9.94399 6.8879 9.97311 7.27689 9.89335 7.65086C9.8136 8.02482 9.62831 8.36809 9.35944 8.63998L8.08945 9.90997C9.513 12.4135 11.5859 14.4864 14.0894 15.91L15.3594 14.64C15.6313 14.3711 15.9746 14.1858 16.3486 14.1061C16.7225 14.0263 17.1115 14.0554 17.4694 14.19C18.3767 14.5285 19.3194 14.7634 20.2794 14.89C20.7652 14.9585 21.2088 15.2032 21.526 15.5775C21.8431 15.9518 22.0116 16.4296 21.9994 16.92Z" />
  ),
  whatsapp: (
    <path d="M3 21L4.65 16.2C3.6 14.6 3.1 12.8 3.1 11C3.1 6.1 7.1 2 12 2C16.9 2 21 6.1 21 11C21 15.9 16.9 20 12 20C10.2 20 8.5 19.5 7 18.5L3 21ZM9 7.5C9 7.5 8 8 8 9.5C8 12 11.5 15.5 14 15.5C15.5 15.5 16 14.5 16 14.5L14.5 13L13.5 13.5C12.5 13 11 11.5 10.5 10.5L11 9.5L9.5 7.5H9Z" />
  ),
  email: (
    <>
      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" />
      <path d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7" />
    </>
  ),
  location: (
    <>
      <path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" />
      <path d="M8 2V18" />
      <path d="M16 6V22" />
    </>
  ),
  hours: (
    <>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      <path d="M12 6V12L16 14" />
    </>
  ),
  text: (
    <>
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
      <path d="M12 16V12" />
      <path d="M12 8H12.01" />
    </>
  ),
};

// The contact form fields; they map to the contact_us columns. The dashboard
// only edits their wording (contact_page.form_fields.fields).
const FORM_FIELDS = {
  full_name: { type: 'text', required: true },
  email_address: { type: 'email', required: true },
  phone_number: { type: 'tel', required: false },
  company_name: { type: 'text', required: false },
  subject: { type: 'text', required: true },
  message: { type: 'textarea', required: true },
};

const isRecord = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);
const text = (v) => (typeof v === 'string' ? v.trim() : '');
const lines = (value) => value.split(/[\n,]+/).map((v) => v.trim()).filter(Boolean);

// Valid, non-empty info cards in the saved order
function normalizeInfo(info) {
  if (!Array.isArray(info)) return [];
  return info
    .filter(isRecord)
    .map((item) => ({
      type: INFO_ICONS[item.type] ? item.type : 'text',
      label: text(item.label),
      title: text(item.title),
    }))
    .filter((item) => item.title);
}

const isMapEmbed = (url) => /\/maps\/embed|[?&]output=embed/i.test(url);
const linkClass = 'hover:text-[#C83C64] transition-colors break-words';

// The card body for each kind of contact info
function InfoValue({ type, title }) {
  switch (type) {
    case 'phone':
      return lines(title).map((number) => (
        <a key={number} href={`tel:${number.replace(/[^\d+]/g, '')}`} className={`block ${linkClass}`}>
          {number}
        </a>
      ));
    case 'whatsapp':
      return lines(title).map((number) => (
        <a
          key={number}
          href={`https://wa.me/${number.replace(/\D/g, '')}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`block ${linkClass}`}
        >
          {number}
        </a>
      ));
    case 'email':
      return lines(title).map((email) => (
        <a key={email} href={`mailto:${email}`} className={`block ${linkClass}`}>
          {email}
        </a>
      ));
    case 'location':
      if (!/^https?:\/\//i.test(title)) return <span className="whitespace-pre-line">{title}</span>;
      return isMapEmbed(title) ? (
        <iframe
          src={title}
          title="Location map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="w-full h-48 rounded-lg border-0 mt-1"
        />
      ) : (
        <a href={title} target="_blank" rel="noopener noreferrer" className={`underline ${linkClass}`}>
          View on Google Maps
        </a>
      );
    default:
      // address, hours, text: shown as typed
      return <span className="whitespace-pre-line">{title}</span>;
  }
}

export default function ContactSection({ title, description, info, formFields }) {
  const infoItems = normalizeInfo(info);
  const formText = isRecord(formFields) ? formFields : {};
  const fieldText = isRecord(formText.fields) ? formText.fields : {};
  const formHeading = text(formText.heading);
  // Only the saved wording is used: empty text is simply not shown
  const submitLabel = text(formText.submit_label);
  const formNote = text(formText.note);
  const field = (name) => {
    const saved = isRecord(fieldText[name]) ? fieldText[name] : {};
    return {
      label: text(saved.label),
      placeholder: text(saved.placeholder),
    };
  };

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
      if (headingRef.current) gsap.fromTo(headingRef.current,
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
      if (subtitleRef.current) gsap.fromTo(subtitleRef.current,
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
            trigger: headingRef.current || subtitleRef.current,
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

  const inputClass =
    'w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#C83C64] focus:ring-1 focus:ring-[#C83C64]/20 transition-all duration-300';

  const renderField = (name) => {
    const { label, placeholder } = field(name);
    const { type, required } = FORM_FIELDS[name];
    const id = `contact-${name}`;
    return (
      <div>
        {label && (
          <label htmlFor={id} className="block text-sm text-gray-700 mb-2">
            {label}
            {required && ' *'}
          </label>
        )}
        {type === 'textarea' ? (
          <textarea
            id={id}
            aria-label={label ? undefined : name.replace(/_/g, ' ')}
            rows={5}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className={`${inputClass} resize-none`}
          />
        ) : (
          <input
            id={id}
            aria-label={label ? undefined : name.replace(/_/g, ' ')}
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className={inputClass}
          />
        )}
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="bg-white py-16 md:py-24 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        {(title || description) && (
          <div className="text-center mb-12 mt-10">
            {title && (
              <h1
                ref={headingRef}
                className="aloevera-bold text-4xl sm:text-5xl mb-4 text-[#C83C64]"
                style={{ opacity: 0 }}
              >
                {title}
              </h1>
            )}
            {description && (
              <p
                ref={subtitleRef}
                className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto whitespace-pre-line"
                style={{ opacity: 0 }}
              >
                {description}
              </p>
            )}
          </div>
        )}

        <div className={`flex flex-col lg:flex-row gap-8 lg:gap-12 ${title || description ? '' : 'mt-10'}`}>
          {/* Left - Contact Info Cards */}
          {infoItems.length > 0 && (
            <div className="w-full lg:w-2/5 space-y-4">
              {infoItems.map((item, index) => (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-[#C83C64]/30 transition-all duration-300 cursor-default"
                  style={{ opacity: 0 }}
                >
                  <div className="flex gap-4">
                    <div
                      ref={(el) => (iconRefs.current[index] = el)}
                      className="w-12 h-12 flex items-center justify-center flex-shrink-0 rounded-[10px]"
                      style={{ backgroundColor: '#0F172B' }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        {INFO_ICONS[item.type]}
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      {item.label && <h3 className="font-lato font-semibold text-gray-800 mb-2">{item.label}</h3>}
                      <div className="text-gray-600 text-sm leading-relaxed">
                        <InfoValue type={item.type} title={item.title} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Right - Contact Form */}
          <div
            ref={formContainerRef}
            className={`w-full ${infoItems.length > 0 ? 'lg:w-3/5' : 'max-w-3xl mx-auto'} border rounded-xl px-5 py-8 sm:px-8 sm:py-10 md:px-14 md:py-14 border-gray-200 hover:shadow-xl transition-shadow duration-500`}
            style={{ opacity: 0 }}
          >
            {formHeading && (
              <h2 className="font-lato font-medium text-2xl text-[#0F172B] mb-8">{formHeading}</h2>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Row 1: Full Name & Email */}
              <div
                ref={(el) => (formFieldRefs.current[0] = el)}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                style={{ opacity: 0 }}
              >
                {renderField('full_name')}
                {renderField('email_address')}
              </div>

              {/* Row 2: Phone & Company */}
              <div
                ref={(el) => (formFieldRefs.current[1] = el)}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                style={{ opacity: 0 }}
              >
                {renderField('phone_number')}
                {renderField('company_name')}
              </div>

              {/* Subject */}
              <div ref={(el) => (formFieldRefs.current[2] = el)} style={{ opacity: 0 }}>
                {renderField('subject')}
              </div>

              {/* Message */}
              <div ref={(el) => (formFieldRefs.current[3] = el)} style={{ opacity: 0 }}>
                {renderField('message')}
              </div>

              {/* Submit Button */}
              <button
                ref={buttonRef}
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-lg text-white font-medium transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#0a0a2e]/25 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
                style={{ backgroundColor: '#0a0a2e', opacity: 0 }}
              >
                {isLoading ? 'Sending...' : submitLabel}
              </button>

              {formNote && <p className="text-xs text-gray-500 text-center whitespace-pre-line">{formNote}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
