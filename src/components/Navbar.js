'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  
  // Force white background on contact page
  const forceWhiteBg = pathname === '/contact' || pathname.startsWith('/careers');
  // Force dark logo + text (without forcing white bg) on product detail pages
  const forceDarkContent = pathname.startsWith('/products/');
  const showWhiteBg = forceWhiteBg || isScrolled || isMenuOpen;
  const useDarkContent = showWhiteBg || forceDarkContent;

  useEffect(() => {
    // On homepage, listen for when About section reaches the top
    if (pathname === '/') {
      const handleAboutReachedTop = (e) => {
        setIsScrolled(e.detail.reached);
      };

      window.addEventListener('aboutReachedTop', handleAboutReachedTop);
      return () => window.removeEventListener('aboutReachedTop', handleAboutReachedTop);
    } else {
      // On other pages, use normal scroll behavior
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 0);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${showWhiteBg ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="w-full px-8 md:px-16 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src={useDarkContent ? "/images/logo.png" : "/images/logo-2.png"}
              alt="Luxume" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Content (Links + Button) - Pushed to right via flex justify-between + grouping */}
          <div className="hidden md:flex items-center gap-10">
            <Link 
              href="/" 
              className={`text-sm font-aloevera hover:text-pink-400 transition-colors ${pathname === '/' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
              style={{ fontWeight: 300 }}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-aloevera hover:text-pink-400 transition-colors ${pathname === '/about' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
              style={{ fontWeight: 300 }}
            >
              About Us
            </Link>
            <Link 
              href="/products" 
              className={`text-sm font-aloevera hover:text-pink-400 transition-colors ${pathname === '/products' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
              style={{ fontWeight: 300 }}
            >
              Products
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-aloevera hover:text-pink-400 transition-colors ${pathname === '/contact' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
              style={{ fontWeight: 300 }}
            >
              Contact Us
            </Link>
            <Link 
              href="/blog" 
              className={`text-sm font-aloevera hover:text-pink-400 transition-colors ${pathname === '/blog' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
              style={{ fontWeight: 300 }}
            >
              Blog
            </Link>
            <Link 
              href="/careers" 
              className={`text-sm font-aloevera hover:text-pink-400 transition-colors ${pathname === '/careers' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
              style={{ fontWeight: 300 }}
            >
              Careers
            </Link>

            {/* CTA Button */}
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

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${useDarkContent ? 'text-gray-800' : 'text-white'}`}
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
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Us' },
                { href: '/products', label: 'Products' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/blog', label: 'Blog' },
                { href: '/careers', label: 'Careers' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-aloevera hover:text-pink-400 transition-colors ${pathname === link.href ? 'text-pink-400' : 'text-gray-800'}`}
                  style={{ fontWeight: 300 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
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
