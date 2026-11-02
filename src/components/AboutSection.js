'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { parseHtml } from '@/lib/parseHtml';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
const escapeHtml = (text) => text.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);

// Title and description come from the dashboard (home_page smart_home_* fields).
// There are no static fallbacks: an empty field hides its element, and the
// section is skipped when both are empty. The title is split at the first
// ":" — the part before it is pink, the rest navy. It stays plain text because
// the heading animation rewrites each span's text into per-letter spans.
export default function AboutSection({ title = '', description = '' }) {
  const colonIndex = title.indexOf(':');
  const accent = colonIndex === -1 ? title : title.slice(0, colonIndex).trimEnd();
  const rest = colonIndex === -1 ? '' : title.slice(colonIndex);

  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar color change trigger - when About section touches navbar bottom
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 64px', // When top of About section hits navbar bottom (navbar height ~64px)
        end: 'bottom top',
        onEnter: () => {
          window.dispatchEvent(new CustomEvent('aboutReachedTop', { detail: { reached: true } }));
        },
        onLeaveBack: () => {
          window.dispatchEvent(new CustomEvent('aboutReachedTop', { detail: { reached: false } }));
        }
      });

      // Content animations (triggered when section is visible)
      const contentTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate decorative line (keep as is — already unique)
      contentTl.fromTo(lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );

      // Heading — letter-stagger reveal
      const headingEl = headingRef.current;
      if (headingEl) {
        // Wrap each word's text in spans for animation
        const spans = headingEl.querySelectorAll('span');
        spans.forEach(span => {
          const text = span.textContent;
          const words = text.trim().split(/(\s+)/);
          span.innerHTML = words.map(segment => {
            // Preserve whitespace segments as-is
            if (/^\s+$/.test(segment)) return segment;
            // Wrap each word in a whitespace-nowrap inline-block so the browser
            // line-breaks between words, not between individual character spans
            // Characters come from the dashboard, so escape them before they
            // go into innerHTML
            const chars = Array.from(segment).map(char =>
              `<span class="inline-block" style="opacity:0;transform:translateY(20px) rotateX(40deg)">${escapeHtml(char)}</span>`
            ).join('');
            return `<span class="inline-block whitespace-nowrap">${chars}</span>`;
          }).join('');
        });

        const chars = headingEl.querySelectorAll('.inline-block');
        contentTl.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.04,
          stagger: 0.03,
          ease: 'power2.out',
        }, '-=0.2');
      }

      // Description — blur-to-sharp fade
      if (descriptionRef.current) {
        contentTl.fromTo(descriptionRef.current,
          { opacity: 0, filter: 'blur(8px)', y: 15 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: 1,
            ease: 'power2.out'
          },
          '-=0.3'
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative z-20 bg-white py-6 px-4 sm:px-6 md:px-8 w-full"
    >
      <div className="mx-auto flex flex-col items-center text-center w-full">

        {/* Decorative Line */}
        <div 
          ref={lineRef}
          className="w-16 sm:w-20 h-1 rounded-full mb-4 origin-center"
          style={{ 
            background: 'linear-gradient(90deg, #C83C64 0%, #E91E63 100%)',
            opacity: 0
          }}
        />

        {/* Heading */}
        {title && (
          <h2
            ref={headingRef}
            className="mb-5 text-2xl sm:text-3xl md:text-4xl lg:text-[44px] leading-tight"
            style={{ perspective: '600px' }}
          >
            {accent && (
              <span className="aloevera-bold text-[#C83C64]">
                {accent}
              </span>
            )}
            {rest && (
              <span className="aloevera-bold text-[#1a1a4e]">
                {accent ? ' ' : ''}{rest}
              </span>
            )}
          </h2>
        )}

        {/* Description */}
        {description && (
          <p
            ref={descriptionRef}
            className="max-w-4xl text-sm sm:text-[15px] leading-7 sm:leading-8 text-[#666666] text-center px-2 sm:px-4 whitespace-pre-line"
            style={{ opacity: 0 }}
          >
            {parseHtml(description)}
          </p>
        )}

      </div>
    </section>
  );
}
