'use client';

import Image from 'next/image';
import { useAltLookup } from '@/providers/AltTextProvider';
import { parseHtml } from '@/lib/parseHtml';

// All content comes from the dashboard (home_page hero fields, page_seo body_text).
// There are no static fallbacks: an empty field hides its element.
// Text fields go through parseHtml, so editors can use <br>, &nbsp;, <strong> etc.
export default function HeroSection({
  heading = '',
  text = '',
  banner = '',
  buttonLabel = '',
  buttonLink = '',
}) {
  const getAlt = useAltLookup();
  const isExternal = /^https?:\/\//i.test(buttonLink);

  return (
    <section className="fixed top-0 left-0 right-0 z-0 h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/*
          This is the LCP element, so it carries priority and is served through
          next/image for AVIF/WebP negotiation and a responsive srcset. The
          object-position classes reproduce the previous bg-right / md:bg-center.
          alt defaults to empty: the image is decorative, the h1 carries the
          meaning. The dashboard can still set one via its image alt text.
          next/image throws on an empty src, so it only renders with a banner.
        */}
        {banner && (
          <Image
            src={banner}
            alt={getAlt(banner, '')}
            fill
            priority
            sizes="100vw"
            className="object-cover object-right md:object-center"
          />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          {/* Main Heading */}
          {heading && (
            <h1
              className={`aloevera-regular text-white leading-snug whitespace-pre-line drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-50 ${
                text ? 'mb-4 sm:mb-5' : 'mb-6 sm:mb-8 md:mb-10'
              }`}
            >
              {parseHtml(heading)}
            </h1>
          )}

          {text && (
            <p className="font-lato text-white/85 drop-shadow text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 md:mb-10 whitespace-pre-line">
              {parseHtml(text)}
            </p>
          )}

          {/* CTA Button: needs both a label and a link */}
          {buttonLabel && buttonLink && (
            <a
              href={buttonLink}
              {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
              className="group inline-flex items-center gap-3 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base"
              style={{
                backgroundColor: '#C83C64',
                maxWidth: '250px',
              }}
            >
              <span className="aloevera-medium">{parseHtml(buttonLabel)}</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
