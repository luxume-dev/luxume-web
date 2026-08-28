'use client';

import Link from 'next/link';
import { FaPhone, FaInstagram, FaFacebookF, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPaperPlane, FaArrowRight } from 'react-icons/fa';
import { useNewsletter } from '@/hooks/useNewsletter';
import { useProducts } from '@/hooks/useProducts';

// Fallback links in case products haven't loaded yet
const FALLBACK_PRODUCTS = [
  { title: 'Colour Coated Galvalume Sheets', slug: 'colour-coated-galvalume-sheets' },
  { title: 'Color Coated Galvalume Coils', slug: 'color-coated-galvalume-coils' },
];

export default function Footer() {
  const { email, setEmail, isLoading, status, handleSubscribe } = useNewsletter();
  const { data: products, isLoading: productsLoading } = useProducts();

  const productLinks = (products && products.length > 0) ? products : FALLBACK_PRODUCTS;

  return (
    <footer className="relative z-30 bg-[#0B1120] text-gray-300 font-lato">
      
      {/* ─── PRE-FOOTER CTA BANNER ───────────────────────────────────────────── */}
      <div className="relative py-20 lg:py-24 border-b border-white/5">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/footer.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 z-0 bg-[#0B1120]/80 mix-blend-multiply" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B1120] to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left max-w-2xl">
            <h2 className="aloevera-light text-white text-4xl sm:text-5xl lg:text-[55px] leading-tight mb-4">
              Experience <br className="hidden md:block"/>
              <span style={{ color: '#C83C64' }}>Strength</span> Above All
            </h2>
            <p className="font-lato font-light text-gray-300 text-base sm:text-lg max-w-lg mx-auto md:mx-0">
              Built with premium steel and precision engineering to deliver unmatched durability, reliability, and performance.
            </p>
          </div>
          
          <div className="flex-shrink-0">
            <Link 
              href="/contact"
              className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-300 overflow-hidden rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(200,60,100,0.4)]"
              style={{ backgroundColor: '#C83C64' }}
            >
              <span className="relative flex items-center gap-3">
                Get a Free Quote
                <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── MAIN FOOTER CONTENT ─────────────────────────────────────────────── */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Column 1: Brand & Description (spans 4 cols) */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 lg:pr-8">
              <Link href="/" className="inline-block mb-6">
                <img src="/images/logo-2.png" alt="Luxume Roofing" width={120} height={48} className="h-12 w-auto drop-shadow-md" />
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                Luxume produces premium colour-coated sheets to safeguard and enhance structures in the construction industry. Uncompromising quality for lasting peace of mind.
              </p>
              
              {/* Socials */}
              <div className="flex gap-4">
                {[
                  { Icon: FaPhone,     href: 'tel:+919778557752', color: '#C83C64' },
                  { Icon: FaInstagram, href: 'https://www.instagram.com/luxume_roofing/', color: '#E1306C' },
                  { Icon: FaFacebookF, href: 'https://www.facebook.com/profile.php?id=100069323057371', color: '#1877F2' },
                  { Icon: FaYoutube,   href: 'https://www.youtube.com/@Luxume-i1d', color: '#FF0000' },
                ].map(({ Icon, href, color }, index) => (
                  <a 
                    key={index}
                    href={href}
                    target={href.startsWith('tel') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="group w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:border-white/20"
                  >
                    <Icon className="text-sm transition-colors duration-300" style={{ '--icon-color': color }} onMouseEnter={(e) => e.currentTarget.style.color = color} onMouseLeave={(e) => e.currentTarget.style.color = ''} />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links (spans 2 cols) */}
            <div className="lg:col-span-2">
              <h4 className="aloevera-medium text-white text-lg mb-6 tracking-wider">COMPANY</h4>
              <ul className="space-y-3">
                {[
                  { name: 'Home', href: '/' },
                  { name: 'About Us', href: '/about' },
                  { name: 'Products', href: '/products' },
                  { name: 'Careers', href: '/careers' },
                  { name: 'Contact', href: '/contact' }
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300">
                      <span className="w-0 h-[1px] bg-[#C83C64] mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Products (spans 3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="aloevera-medium text-white text-lg mb-6 tracking-wider">PRODUCTS</h4>
              <ul className="space-y-3">
                {productsLoading ? (
                  // Skeleton loading state
                  Array.from({ length: 3 }).map((_, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-3 h-[1px] bg-white/10 rounded" />
                      <span
                        className="h-3 rounded bg-white/10 animate-pulse"
                        style={{ width: `${60 + i * 20}%` }}
                      />
                    </li>
                  ))
                ) : (
                  productLinks.map((product) => (
                    <li key={product.id ?? product.slug}>
                      <Link
                        href={`/products/${product.slug}`}
                        className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <span className="w-0 h-[1px] bg-[#C83C64] mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2" />
                        {product.title ?? product.name}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>

            {/* Column 4: Contact & Newsletter (spans 3 cols) */}
            <div className="lg:col-span-3">
              <h4 className="aloevera-medium text-white text-lg mb-6 tracking-wider">CONNECT</h4>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ color: '#C83C64' }}>
                    <FaMapMarkerAlt className="text-sm" />
                  </div>
                  <span className="text-sm text-gray-400 leading-relaxed">
                    Luxume Roofing, 62/2592, 2nd Floor, Saj Mahal Building, Madakappillil Lane, Near Govt. HSS for Girls, Chittoor Road, Ernakulam-682016, Kerala.
                  </span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0" style={{ color: '#C83C64' }}>
                    <FaPhone className="text-sm" />
                  </div>
                  <a href="tel:+919778557752" className="text-sm text-gray-400 hover:text-white transition-colors">+91 97785 57752</a>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0" style={{ color: '#C83C64' }}>
                    <FaEnvelope className="text-sm" />
                  </div>
                  <a href="mailto:info@luxume.in" className="text-sm text-gray-400 hover:text-white transition-colors">info@luxume.in</a>
                </li>
              </ul>

              <form onSubmit={handleSubscribe} className="relative mt-8">
                <label className="block text-xs uppercase tracking-wider text-gray-500 mb-2">Subscribe to News</label>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#111A2D] border border-white/10 rounded-xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C83C64] transition-colors duration-300 pr-14 shadow-inner"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-1.5 top-1.5 bottom-1.5 w-11 rounded-lg flex items-center justify-center text-white transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                    style={{ backgroundColor: '#C83C64' }}
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <FaPaperPlane className="text-sm ml-[-2px]" />
                    )}
                  </button>
                </div>
                {status.message && (
                  <p className={`absolute -bottom-6 left-1 text-xs font-medium ${
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
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 text-center md:text-left">
              &copy; {new Date().getFullYear()} Luxume Roofing. All Rights Reserved. 
              <span className="mx-2 hidden sm:inline">|</span> 
              <br className="sm:hidden" />
              Designed & Developed by{' '}
              <a 
                href="https://snapinfinity.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white font-medium transition-colors"
              >
                Snap Infinity
              </a>
            </p>
            <div className="flex gap-6">
              <Link href="/terms-conditions" className="text-xs text-gray-500 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
