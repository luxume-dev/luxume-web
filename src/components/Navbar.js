'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isProductsPage = pathname === '/products';

  const navbarBg = isProductsPage ? 'bg-white shadow-sm' : 'bg-transparent';
  // Use a dark color for text on white background, white otherwise
  const textColorClass = isProductsPage ? 'text-[#000000]' : 'text-white';
  const logoSrc = '/images/logo.png'; // Assuming same logo for now, or maybe needs a dark variant if transparent logo is white? 
  // User didn't specify logo change, assuming logo is visible on white.

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300 ${navbarBg}`}>
      <div className="w-full px-8 md:px-16 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src={logoSrc}
              alt="Luxume" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Content (Links + Button) - Pushed to right via flex justify-between + grouping */}
          <div className="hidden md:flex items-center gap-10">
            {/* Navigation Links */}
            <div className="flex items-center gap-10">
              <Link 
                href="/" 
                className={`font-aloevera font-light hover:text-pink-400 transition-colors ${textColorClass}`}
                style={{ fontSize: '16px', fontWeight: 300 }}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`font-aloevera font-light hover:text-pink-400 transition-colors ${textColorClass}`}
                style={{ fontSize: '16px', fontWeight: 300 }}
              >
                About Us
              </Link>
              <Link 
                href="/products" 
                className={`font-aloevera font-light hover:text-pink-400 transition-colors ${textColorClass}`}
                style={{ fontSize: '16px', fontWeight: 300 }}
              >
                Products
              </Link>
              <Link 
                href="/contact" 
                className={`font-aloevera font-light hover:text-pink-400 transition-colors ${textColorClass}`}
                style={{ fontSize: '16px', fontWeight: 300 }}
              >
                Contact Us
              </Link>
              <Link 
                href="/blog" 
                className={`font-aloevera font-light hover:text-pink-400 transition-colors ${textColorClass}`}
                style={{ fontSize: '16px', fontWeight: 300 }}
              >
                Blog
              </Link>
              <Link 
                href="/careers" 
                className={`font-aloevera font-light hover:text-pink-400 transition-colors ${textColorClass}`}
                style={{ fontSize: '16px', fontWeight: 300 }}
              >
                Careers
              </Link>
            </div>

            {/* CTA Button */}
            <div>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center text-white font-aloevera rounded transition-all hover:opacity-90"
                style={{ 
                  width: '110px', 
                  height: '38px', 
                  padding: '10px', 
                  gap: '10px',
                  backgroundColor: '#C83C64',
                  fontSize: '16px',
                  fontWeight: 500
                }}
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Mobile Menu Button - Change color based on bg? */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${textColorClass}`}
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
            <div className="flex flex-col gap-4 pt-4 bg-white/95 backdrop-blur-sm p-4 rounded-lg shadow-lg"> 
            {/* Added bg-white for mobile menu legibility if main bg is transparent */}
              <Link
                href="/"
                className="text-gray-800 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-600 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/products"
                className="text-gray-600 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/blog"
                className="text-gray-600 text-sm font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className="text-gray-600 text-sm font-medium"
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
