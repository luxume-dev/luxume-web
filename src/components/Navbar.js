'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@/hooks/useProducts';
import { useCareers } from '@/hooks/useCareers';
import { useGeneralSettings } from '@/hooks/useGeneralSettings';
import SiteLink from '@/components/SiteLink';
import { isActivePath, resolveLinks } from '@/lib/siteSettings';

const ChevronDown = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Index of the open desktop dropdown / expanded mobile sub-menu
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openMobile, setOpenMobile] = useState(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef(null);

  const { header } = useGeneralSettings();
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const { data: careers, isLoading: isCareersLoading } = useCareers();

  // Menu items with their dropdown links resolved. An automatic dropdown with
  // nothing in it (e.g. no open jobs) becomes a plain link.
  const menu = (Array.isArray(header.menu) ? header.menu : [])
    .filter((item) => item && item.label)
    .map((item) => {
      const dropdown = item.dropdown && item.dropdown !== 'none' ? item.dropdown : null;
      const loading =
        (dropdown === 'products' && isProductsLoading) || (dropdown === 'careers' && isCareersLoading);
      const children = dropdown ? resolveLinks(dropdown, item.children, { products, careers }) : [];
      const hasDropdown = !!dropdown && (loading || children.length > 0);
      return { ...item, href: item.href || '', hasDropdown, loading, children };
    })
    .filter((item) => item.hasDropdown || item.href);

  const cta = header.cta && header.cta.label && header.cta.href ? header.cta : null;

  // Force white background on contact page and others
  const forceWhiteBg = pathname === '/contact' || pathname.startsWith('/careers') || pathname === '/privacy-policy' || pathname === '/terms-conditions' || pathname === '/projects' || pathname.startsWith('/products/');
  const showWhiteBg = forceWhiteBg || isScrolled || isMenuOpen;
  const useDarkContent = showWhiteBg;
  const logoSrc = useDarkContent ? header.logo : header.logo_light;

  const itemActive = (item) =>
    isActivePath(pathname, item.href) || item.children.some((c) => isActivePath(pathname, c.href));

  // Handle dropdown hover with delay so it doesn't flicker
  const handleDropdownEnter = (index) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(index);
  };
  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
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

  // Close dropdowns on route change (state reset during render, not in an effect)
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpenDropdown(null);
    setOpenMobile(null);
  }

  const linkColor = (active) =>
    active ? 'text-pink-400' : useDarkContent ? 'text-gray-800' : 'text-white';

  const ctaStyle = {
    minWidth: '130px',
    height: '38px',
    padding: '10px 16px',
    gap: '10px',
    backgroundColor: '#C83C64',
    fontSize: '16px',
  };

  return (
    <nav data-site-nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${showWhiteBg ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="w-full px-8 md:px-16 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center min-h-12" onClick={() => setIsMenuOpen(false)}>
            {logoSrc && (
              <img
                src={logoSrc}
                alt="Luxume"
                width={120}
                height={48}
                className="h-12 w-auto"
              />
            )}
          </Link>

          {/* Desktop Content (Links + Button) */}
          <div className="hidden md:flex items-center gap-4 lg:gap-10">
            {menu.map((item, index) => {
              const active = itemActive(item);

              if (!item.hasDropdown) {
                return (
                  <SiteLink
                    key={`${index}-${item.label}`}
                    href={item.href}
                    className={`text-sm aloevera-light hover:text-pink-400 transition-colors ${linkColor(active)}`}
                  >
                    {item.label}
                  </SiteLink>
                );
              }

              const isOpen = openDropdown === index;
              const labelClass = `text-sm aloevera-light hover:text-pink-400 transition-colors flex items-center gap-1 ${linkColor(active)}`;
              const label = (
                <>
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </>
              );

              return (
                <div
                  key={`${index}-${item.label}`}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(index)}
                  onMouseLeave={handleDropdownLeave}
                >
                  {item.href ? (
                    <SiteLink href={item.href} className={labelClass}>
                      {label}
                    </SiteLink>
                  ) : (
                    <button
                      type="button"
                      className={labelClass}
                      aria-expanded={isOpen}
                      onClick={() => setOpenDropdown(isOpen ? null : index)}
                    >
                      {label}
                    </button>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                        style={{ minWidth: '280px' }}
                      >
                        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2 max-h-[70vh] overflow-y-auto">
                          {item.loading ? (
                            [1, 2, 3].map((i) => (
                              <div key={i} className="flex items-center gap-3 px-5 py-3">
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-gray-200" />
                                <div className="h-4 rounded bg-gray-200 animate-pulse" style={{ width: `${140 + i * 20}px` }} />
                              </div>
                            ))
                          ) : (
                            item.children.map((child) => (
                              <SiteLink
                                key={child.key}
                                href={child.href}
                                className="flex items-center gap-3 px-5 py-3 text-sm text-gray-700 hover:bg-pink-50 hover:text-[#C83C64] transition-colors duration-200 font-lato"
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: '#C83C64' }}
                                />
                                {child.label}
                              </SiteLink>
                            ))
                          )}
                          {item.view_all_label && item.href && (
                            <div className="border-t border-gray-100 mt-1 pt-1">
                              <SiteLink
                                href={item.href}
                                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold hover:bg-pink-50 transition-colors duration-200 font-lato"
                                style={{ color: '#C83C64' }}
                              >
                                {item.view_all_label}
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                              </SiteLink>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* CTA Button */}
            {cta && (
              <SiteLink
                href={cta.href}
                className="inline-flex items-center justify-center text-white aloevera-medium rounded transition-all hover:opacity-90 whitespace-nowrap"
                style={ctaStyle}
              >
                {cta.label}
              </SiteLink>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${useDarkContent ? 'text-gray-800' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                  {menu.map((item, index) => {
                    const active = itemActive(item);
                    const mobileClass = `text-sm aloevera-light hover:text-pink-400 transition-colors py-2 ${active ? 'text-pink-400' : 'text-gray-800'}`;

                    if (!item.hasDropdown) {
                      return (
                        <SiteLink
                          key={`${index}-${item.label}`}
                          href={item.href}
                          className={mobileClass}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.label}
                        </SiteLink>
                      );
                    }

                    const isOpen = openMobile === index;
                    return (
                      <div key={`${index}-${item.label}`}>
                        <button
                          type="button"
                          onClick={() => setOpenMobile(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          className={`flex items-center gap-1 ${mobileClass}`}
                        >
                          {item.label}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 py-1 border-l-2 border-pink-200 ml-2 flex flex-col gap-1">
                                {item.loading ? (
                                  [1, 2, 3].map((i) => (
                                    <div key={i} className="py-1.5">
                                      <div className="h-4 rounded bg-gray-200 animate-pulse" style={{ width: `${100 + i * 20}px` }} />
                                    </div>
                                  ))
                                ) : (
                                  item.children.map((child) => (
                                    <SiteLink
                                      key={child.key}
                                      href={child.href}
                                      className={`text-sm font-lato py-1.5 transition-colors duration-200 ${
                                        pathname === child.href ? 'text-[#C83C64] font-medium' : 'text-gray-600 hover:text-[#C83C64]'
                                      }`}
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {child.label}
                                    </SiteLink>
                                  ))
                                )}
                                {item.href && (
                                  <SiteLink
                                    href={item.href}
                                    className="text-sm font-lato font-semibold py-1.5 transition-colors duration-200"
                                    style={{ color: '#C83C64' }}
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    {item.view_all_label || item.label} →
                                  </SiteLink>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* CTA */}
                  {cta && (
                    <SiteLink
                      href={cta.href}
                      className="inline-flex self-start items-center justify-center text-white aloevera-medium rounded transition-all hover:opacity-90 mt-2 whitespace-nowrap"
                      style={ctaStyle}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {cta.label}
                    </SiteLink>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
