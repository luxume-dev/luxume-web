'use client';

import Link from 'next/link';
import { FaPhone, FaInstagram, FaFacebookF, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { useNewsletter } from '@/hooks/useNewsletter';

export default function Footer() {
  const { email, setEmail, isLoading, status, handleSubscribe } = useNewsletter();

  return (
    <footer className="relative z-10">
      {/* Hero Banner Section */}
      <div 
        className="relative py-24 sm:py-32 md:py-40 lg:py-48 px-4"
        style={{
          backgroundImage: 'url(/images/footer.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(10, 10, 40, 0.85) 0%, rgba(10, 10, 40, 0.9) 100%)'
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-16">
            <img 
              src="/images/logo-2.png" 
              alt="Luxume Roofing" 
              className="h-24 sm:h-32 md:h-40 lg:h-48"
            />
          </div>

          {/* Tagline */}
          <div className="text-center sm:text-left max-w-md mx-auto">
            <h3 
              className="font-aloevera text-2xl sm:text-3xl md:text-4xl text-white mb-2"
              style={{ fontWeight: 400, fontStyle: 'italic' }}
            >
              Experience
            </h3>
            <h3 
              className="font-aloevera text-2xl sm:text-3xl md:text-4xl text-white mb-4"
              style={{ fontWeight: 400, fontStyle: 'italic' }}
            >
              Strength Above All
            </h3>
            <p className="text-gray-400 text-sm sm:text-base mb-6">
              Built with premium steel and precision engineering to deliver unmatched durability, reliability, and performance.
            </p>
            
            {/* Call Now Button */}
            <button 
              className="px-8 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:opacity-90"
              style={{ background: 'linear-gradient(90deg, #E91E63 0%, #F44336 100%)' }}
            >
              Call Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div 
        className="py-12 px-4 sm:py-16 sm:px-6 md:px-8"
        style={{ background: '#0a0a1a' }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Logo & Description */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 pb-8 border-b border-gray-800">
            {/* Logo */}
            <div className="mb-6 lg:mb-0">
              <img src="/images/logo-2.png" alt="Luxume Roofing" className="h-12 sm:h-14" />
            </div>
            
            {/* Description */}
            <p className="text-gray-400 text-sm sm:text-base max-w-md text-center lg:text-right mt-4 lg:mt-0">
              Luxume produces premium colour-coated sheets to safeguard and enhance structures in the construction industry.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-12">
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Products', href: '/products' },
                  { name: 'Contact Us', href: '/contact' },
                  { name: 'Careers', href: '/careers' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 text-sm hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Products */}
            <div>
              <h4 className="text-white font-semibold mb-4">Popular Products</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Color Coated Galvalume Sheets
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 text-sm hover:text-white transition-colors">
                    Color Coated Galvalume Coils
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex gap-3 text-gray-400 text-sm">
                  <FaMapMarkerAlt className="text-gray-500 flex-shrink-0 mt-1" />
                  <span>2nd Floor, SajMahal Building, Madakapilli Lane, Ernakulam South, Ernakulam Pin: 682016</span>
                </li>
                <li className="flex gap-3 text-gray-400 text-sm items-center">
                  <FaPhone className="text-gray-500" />
                  <span>+91 97785 57752</span>
                </li>
                <li className="flex gap-3 text-gray-400 text-sm items-center">
                  <FaEnvelope className="text-gray-500" />
                  <span>info@luxume.com</span>
                </li>
              </ul>
            </div>

            {/* Connect Us & Subscribe */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect Us</h4>
              <div className="flex gap-3 sm:gap-2 mb-6">
                {[FaPhone, FaInstagram, FaFacebookF, FaYoutube].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#"
                    className="w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:opacity-80"
                    style={{ background: '#E91E63' }}
                  >
                    <Icon className="text-white text-base sm:text-sm" />
                  </a>
                ))}
              </div>
              
              <h4 className="text-white font-semibold mb-3">Subscribe Now</h4>
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
                    style={{ background: '#E91E63' }}
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
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              © 2026 Luxume. All Rights Reserved.<br className="sm:hidden" />
              <span className="hidden sm:inline"> </span>Designed & Developed by{' '}
              <a 
                href="https://snapinfinity.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Snap Infinity
              </a>
            </p>
            <div className="flex gap-4 sm:gap-6">
              <Link href="#" className="text-gray-500 text-xs sm:text-sm hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="#" className="text-gray-500 text-xs sm:text-sm hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
