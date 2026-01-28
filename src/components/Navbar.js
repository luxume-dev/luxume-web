'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full mt-4">
      <div className="w-full px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="Luxume" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-10">
            <Link 
              href="/" 
              className="text-white text-sm font-medium hover:text-pink-400 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-white text-sm font-medium hover:text-pink-400 transition-colors"
            >
              About Us
            </Link>
            <Link 
              href="/products" 
              className="text-white text-sm font-medium hover:text-pink-400 transition-colors"
            >
              Products
            </Link>
            <Link 
              href="/contact" 
              className="text-white text-sm font-medium hover:text-pink-400 transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              href="/blog" 
              className="text-white text-sm font-medium hover:text-pink-400 transition-colors"
            >
              Blog
            </Link>
            <Link 
              href="/careers" 
              className="text-white text-sm font-medium hover:text-pink-400 transition-colors"
            >
              Careers
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="tel:+1234567890"
              className="inline-flex items-center justify-center text-white text-sm font-medium rounded transition-all hover:opacity-90"
              style={{ 
                width: '110px', 
                height: '38px', 
                padding: '10px', 
                gap: '10px',
                backgroundColor: '#C83C64'
              }}
            >
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col gap-4 pt-4">
              <Link
                href="/"
                className="text-white text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-white/80 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/products"
                className="text-white/80 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/services"
                className="text-white/80 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="text-white/80 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center text-white text-sm font-medium rounded transition-all hover:opacity-90"
                style={{ 
                  width: '110px', 
                  height: '38px', 
                  padding: '10px', 
                  gap: '10px',
                  backgroundColor: '#C83C64'
                }}
                onClick={() => setIsMenuOpen(false)}
              >
                Call Now
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
