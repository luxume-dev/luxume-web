'use client';

import Link from 'next/link';
import { FaPhone, FaInstagram, FaFacebookF, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { useNewsletter } from '@/hooks/useNewsletter';

export default function Footer() {
  const { email, setEmail, isLoading, status, handleSubscribe } = useNewsletter();

  return (
    <footer className="relative z-30">
      {/* Hero Banner Section */}
      <div 
        className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-4 sm:pb-6 md:pb-8 lg:pb-10 px-4 sm:px-6 md:px-8"
        style={{
          backgroundImage: 'url(/images/footer.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.7) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto ">
          {/* Logo */}
          <div className="flex justify-center my-16 lg:my-24">
            <img 
              src="/images/logo-2.png" 
              alt="Luxume Roofing" 
              className="h-40 sm:h-56 md:h-72 lg:h-[24rem]"
            />
          </div>

          {/* Tagline + Button Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-8 sm:gap-0">
            <div className="text-center sm:text-left w-full sm:w-auto sm:max-w-md">
              <h3 
                className="aloevera-light text-white mb-2 text-[42px] sm:text-[55px] leading-[1.1] sm:leading-[63px]"
              >
                Experience
              </h3>
              <h3 
                className="aloevera-light text-white mb-4 text-[32px] sm:text-[39px] leading-[1.1]"
              >
                Strength Above All
              </h3>
              <p className="font-lato font-light text-white text-[16px] mb-0 mx-auto sm:mx-0 sm:max-w-[360px]">
                Built with premium steel and precision engineering to deliver unmatched durability, reliability, and performance.
              </p>
            </div>
            
            {/* Contact Us Button */}
            <a 
              href="/contact"
              className="rounded text-white font-medium transition-all duration-300 hover:opacity-90 inline-flex items-center justify-center"
              style={{ background: '#C83C64', width: '180px', height: '46px', padding: '10px', gap: '10px' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div 
        className="pt-0 pb-12 px-4 sm:pt-0 sm:pb-16 sm:px-6 md:px-8"
        style={{ background: '#0a0a1a' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Logo & Description */}
          <hr style={{ borderColor: '#D46D64', borderWidth: '0.5px' }} className="mb-6" />
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            {/* Logo */}
            <div className="mb-6 lg:mb-0">
              <img src="/images/logo-2.png" alt="Luxume Roofing" className="h-12 sm:h-14" />
            </div>
            
            {/* Description */}
            <p className="text-gray-400 text-sm sm:text-base max-w-md text-center lg:text-right mt-4 lg:mt-0">
              Luxume produces premium colour-coated sheets to safeguard and enhance structures in the construction industry.
            </p>
          </div>
          <hr style={{ borderColor: '#D46D64', borderWidth: '0.5px' }} className="mb-12" />

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-12">
            {/* Quick Links */}
            <div>
              <h4 className="aloevera-medium text-white text-[16px] mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Products', href: '/products' },
                  { name: 'Contact Us', href: '/contact' },
                  { name: 'Careers', href: '/careers' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="aloevera-light text-gray-400 text-[16px] hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Products */}
            <div>
              <h4 className="aloevera-medium text-white text-[16px] mb-4">Popular Products</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/products/colour-coated-galvalume-sheets" className="aloevera-light text-gray-400 text-[16px] hover:text-white transition-colors">
                    Colour Coated Galvalume Sheets
                  </Link>
                </li>
                <li>
                  <Link href="/products/color-coated-galvalume-coils" className="aloevera-light text-gray-400 text-[16px] hover:text-white transition-colors">
                    Color Coated Galvalume Coils
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="aloevera-medium text-white text-[16px] mb-4">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex gap-3 aloevera-light text-gray-400 text-[16px]">
                  <FaMapMarkerAlt className="text-gray-400 flex-shrink-0 mt-1" />
                  <span>2nd Floor, SajMahal Building, Madakapilli Lane, Ernakulam South, Ernakulam Pin: 682016</span>
                </li>
                <li className="flex gap-3 aloevera-light text-gray-400 text-[16px] items-center">
                  <FaPhone className="text-gray-400" />
                  <a href="tel:+919778557752" className="hover:text-white transition-colors">+91 97785 57752</a>
                </li>
                <li className="flex gap-3 aloevera-light text-gray-400 text-[16px] items-center">
                  <FaEnvelope className="text-gray-400" />
                  <a href="mailto:info@luxume.com" className="hover:text-white transition-colors">info@luxume.com</a>
                </li>
              </ul>
            </div>

            {/* Connect Us & Subscribe */}
            <div>
              <h4 className="aloevera-medium text-white text-[16px] mb-4">Connect Us</h4>
              <div className="flex gap-3 sm:gap-2 mb-6">
                {[
                  { Icon: FaPhone,     href: 'tel:+919778557752' },
                  { Icon: FaInstagram, href: 'https://www.instagram.com/luxume_roofing/' },
                  { Icon: FaFacebookF, href: 'https://www.facebook.com/profile.php?id=100069323057371' },
                  { Icon: FaYoutube,   href: 'https://www.youtube.com/@Luxume_Roofing' },
                ].map(({ Icon, href }, index) => (
                  <a 
                    key={index}
                    href={href}
                    target={href.startsWith('tel') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:opacity-80"
                    style={{ background: '#D46D64' }}
                  >
                    <Icon className="text-white text-base sm:text-sm" />
                  </a>
                ))}
              </div>
              
              <h4 className="aloevera-medium text-white text-[16px] mb-3">Subscribe Now</h4>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex max-w-xs sm:max-w-none">
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 min-w-0 px-3 sm:px-4 py-3 sm:py-2.5 bg-transparent border border-gray-700 rounded-l-lg text-white text-sm focus:outline-none focus:border-gray-500"
                  />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-3 sm:py-2.5 rounded-r-lg transition-all duration-300 hover:opacity-80 disabled:opacity-50 flex-shrink-0"
                    style={{ background: '#D46D64' }}
                  >
                    {isLoading ? (
                      <span className="text-white text-sm">...</span>
                    ) : (
                      <FaPaperPlane className="text-white" />
                    )}
                  </button>
                </div>
                {status.message && (
                  <p className={`text-xs ${
                    status.type === 'success' ? 'text-green-400' : 
                    status.type === 'info' ? 'text-blue-400' : 
                    'text-red-400'
                  }`}>
                    {status.message}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#D46D64] flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              © 2026 Luxume. All Rights Reserved.<br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>Designed & Developed by{' '}
              <a 
                href="https://snapinfinity.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline"
              >
                Snap Infinity
              </a>
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link href="/terms-conditions" className="text-gray-500 text-xs sm:text-sm hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy-policy" className="text-gray-500 text-xs sm:text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
