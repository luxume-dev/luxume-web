'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="fixed top-0 left-0 right-0 z-0 h-screen flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/*
          This is the LCP element, so it carries priority and is served through
          next/image for AVIF/WebP negotiation and a responsive srcset. The
          object-position classes reproduce the previous bg-right / md:bg-center.
          alt is empty: the image is decorative, the h1 carries the meaning.
        */}
        <Image
          src="/images/luxume-hero.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/55"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-2xl">
          {/* Main Heading */}
          <h1 className="aloevera-regular text-white leading-snug mb-6 sm:mb-8 md:mb-10 drop-shadow-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl mt-50">
            Discover the Perfect
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Steel Solution for every
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            Design Solution
          </h1>

          {/* CTA Button */}
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-2xl w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 text-sm sm:text-base"
            style={{
              backgroundColor: '#C83C64',
              maxWidth: '250px',
            }}
          >
            <span className="aloevera-medium">Contact Us</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
