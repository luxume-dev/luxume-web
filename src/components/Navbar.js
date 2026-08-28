'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: products, isLoading: isProductsLoading } = useProducts();
  const productLinks = products || [];

  // Force white background on contact page and others
  const forceWhiteBg = pathname === '/contact' || pathname.startsWith('/careers') || pathname === '/privacy-policy' || pathname === '/terms-conditions' || pathname === '/projects' || pathname.startsWith('/products/');
  const showWhiteBg = forceWhiteBg || isScrolled || isMenuOpen;
  const useDarkContent = showWhiteBg;

  // Handle dropdown hover with delay so it doesn't flicker
  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsDropdownOpen(true);
  };
  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setIsDropdownOpen(false), 150);
  };

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

  // Close dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileProductsOpen(false);
  }, [pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${showWhiteBg ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="w-full px-8 md:px-16 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
            <img
              src={useDarkContent ? "/images/logo.png" : "/images/logo-2.png"}
              alt="Luxume"
              width={120}
              height={48}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Content (Links + Button) - Pushed to right via flex justify-between + grouping */}
          <div className="hidden md:flex items-center gap-4 lg:gap-10">
            <Link
              href="/"
              className={`text-sm aloevera-light hover:text-pink-400 transition-colors ${pathname === '/' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-sm aloevera-light hover:text-pink-400 transition-colors ${pathname === '/about' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
            >
              About Us
            </Link>

            {/* Products with Dropdown */}
            <div
              className="relative"
              onMouseEnter={handleDropdownEnter}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                href="/products"
                className={`text-sm aloevera-light hover:text-pink-400 transition-colors flex items-center gap-1 ${pathname.startsWith('/products') ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
              >
                Products
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                    style={{ minWidth: '280px' }}
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                      {isProductsLoading ? (
                        [1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3 px-5 py-3">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-200" />
                            <div className="h-4 rounded bg-gray-200 animate-pulse" style={{ width: `${140 + i * 20}px` }} />
                          </div>
                        ))
                      ) : (
                        productLinks.map((product) => (
                          <Link
                            key={product.id ?? product.slug}
                            href={`/products/${product.slug}`}
                            className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-[#C83C64] transition-colors duration-200 font-lato"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: '#C83C64' }}
                            />
                            {product.title}
                          </Link>
                        ))
                      )}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <Link
                          href="/products"
                          className="flex items-center gap-2 px-5 py-3 text-sm font-semibold hover:bg-pink-50 transition-colors duration-200 font-lato"
                          style={{ color: '#C83C64' }}
                        >
                          View All Products
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/projects"
              className={`text-sm aloevera-light hover:text-pink-400 transition-colors ${pathname === '/projects' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
            >
              Projects
            </Link>

            <Link
              href="/blog"
              className={`text-sm aloevera-light hover:text-pink-400 transition-colors ${pathname === '/blog' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
            >
              Blog
            </Link>
            <Link
              href="/careers"
              className={`text-sm aloevera-light hover:text-pink-400 transition-colors ${pathname === '/careers' ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white'}`}
            >
              Careers
            </Link>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-white aloevera-medium rounded transition-all hover:opacity-90"
              style={{
                width: '130px',
                height: '38px',
                padding: '10px',
                gap: '10px',
                backgroundColor: '#C83C64',
                fontSize: '16px'
              }}
            >
              Contact Us
            </Link>
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 pb-4 border-t border-gray-200">
                <div className="flex flex-col gap-1 pt-4">
                  {/* Home */}
                  <Link
                    href="/"
                    className={`text-sm aloevera-light hover:text-pink-400 transition-colors py-2 ${pathname === '/' ? 'text-pink-400' : 'text-gray-800'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>

                  {/* About Us */}
                  <Link
                    href="/about"
                    className={`text-sm aloevera-light hover:text-pink-400 transition-colors py-2 ${pathname === '/about' ? 'text-pink-400' : 'text-gray-800'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About Us
                  </Link>

                  {/* Products with expandable sub-menu */}
                  <div>
                    <button
                      onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                      className={`flex items-center gap-1 text-sm aloevera-light hover:text-pink-400 transition-colors py-2 ${pathname.startsWith('/products') ? 'text-pink-400' : 'text-gray-800'}`}
                    >
                      Products
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isMobileProductsOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {isMobileProductsOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 py-1 border-l-2 border-pink-200 ml-2 flex flex-col gap-1">
                            {isProductsLoading ? (
                              [1, 2, 3].map((i) => (
                                <div key={i} className="py-1.5">
                                  <div className="h-4 rounded bg-gray-200 animate-pulse" style={{ width: `${100 + i * 20}px` }} />
                                </div>
                              ))
                            ) : (
                              productLinks.map((product) => (
                                <Link
                                  key={product.id ?? product.slug}
                                  href={`/products/${product.slug}`}
                                  className={`text-sm font-lato py-1.5 transition-colors duration-200 ${
                                    pathname === `/products/${product.slug}` ? 'text-[#C83C64] font-medium' : 'text-gray-600 hover:text-[#C83C64]'
                                  }`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {product.title}
                                </Link>
                              ))
                            )}
                            <Link
                              href="/products"
                              className="text-sm font-lato font-semibold py-1.5 transition-colors duration-200"
                              style={{ color: '#C83C64' }}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              View All Products →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Projects */}
                  <Link
                    href="/projects"
                    className={`text-sm aloevera-light hover:text-pink-400 transition-colors py-2 ${pathname === '/projects' ? 'text-pink-400' : 'text-gray-800'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Projects
                  </Link>

                  {/* Blog */}
                  <Link
                    href="/blog"
                    className={`text-sm aloevera-light hover:text-pink-400 transition-colors py-2 ${pathname === '/blog' ? 'text-pink-400' : 'text-gray-800'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Blog
                  </Link>

                  {/* Careers */}
                  <Link
                    href="/careers"
                    className={`text-sm aloevera-light hover:text-pink-400 transition-colors py-2 ${pathname === '/careers' ? 'text-pink-400' : 'text-gray-800'}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Careers
                  </Link>

                  {/* CTA */}
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center text-white aloevera-medium rounded transition-all hover:opacity-90 mt-2"
                    style={{
                      width: '130px',
                      height: '38px',
                      padding: '10px',
                      gap: '10px',
                      backgroundColor: '#C83C64',
                      fontSize: '16px'
                    }}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
