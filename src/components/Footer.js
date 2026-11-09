'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  FaPhoneAlt,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPaperPlane,
  FaArrowRight,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useNewsletter } from '@/hooks/useNewsletter';
import { useProducts } from '@/hooks/useProducts';
import { useCareers } from '@/hooks/useCareers';
import { useGeneralSettings } from '@/hooks/useGeneralSettings';
import SiteLink from '@/components/SiteLink';
import {
  opensNewTab,
  resolveLinks,
  socialHref,
} from '@/lib/siteSettings';

const SOCIAL_ICONS = {
  phone: { Icon: FaPhoneAlt, color: '#C83C64', label: 'Call us' },
  whatsapp: { Icon: FaWhatsapp, color: '#25D366', label: 'WhatsApp' },
  email: { Icon: FaEnvelope, color: '#C83C64', label: 'Email us' },
  instagram: { Icon: FaInstagram, color: '#E1306C', label: 'Instagram' },
  facebook: { Icon: FaFacebookF, color: '#1877F2', label: 'Facebook' },
  youtube: { Icon: FaYoutube, color: '#FF0000', label: 'YouTube' },
  linkedin: { Icon: FaLinkedinIn, color: '#0A66C2', label: 'LinkedIn' },
  x: { Icon: FaXTwitter, color: '#FFFFFF', label: 'X' },
  pinterest: { Icon: FaPinterestP, color: '#E60023', label: 'Pinterest' },
};

/** Heading with the highlighted part in the brand colour */
function HighlightedHeading({ text, highlight }) {
  const at = highlight ? text.indexOf(highlight) : -1;
  if (at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span style={{ color: '#C83C64' }}>{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  );
}

const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, '')}`;

export default function Footer() {
  const { email, setEmail, isLoading, status, handleSubscribe } = useNewsletter();
  const { footer, footerBottom } = useGeneralSettings();
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: careers, isLoading: careersLoading } = useCareers();

  const cta = footer.cta || {};
  const contact = footer.contact || {};
  const newsletter = footer.newsletter || {};
  const showNewsletter = newsletter.show === true;
  const socials = (Array.isArray(footer.socials) ? footer.socials : [])
    .map((s) => ({ ...s, href: socialHref(s?.platform, s?.url), meta: SOCIAL_ICONS[s?.platform] }))
    .filter((s) => s.href && s.meta);

  const columns = (Array.isArray(footer.columns) ? footer.columns : [])
    .filter(Boolean)
    .map((col) => ({
      ...col,
      loading: (col.source === 'products' && productsLoading) || (col.source === 'careers' && careersLoading),
      links: resolveLinks(col.source, col.links, { products, careers }),
    }))
    .filter((col) => col.loading || col.links.length > 0 || col.title);

  const showContact = !!(contact.heading || contact.address || contact.phone || contact.email || showNewsletter);

  const dev = footerBottom.developed_by || {};
  const bottomLinks = resolveLinks('custom', footerBottom.links, {});

  return (
    <footer data-site-footer className="relative z-30 bg-[#0B1120] text-gray-300 font-lato">

      {/* ─── PRE-FOOTER CTA BANNER ───────────────────────────────────────────── */}
      {cta.heading && (
        <div className="relative py-20 lg:py-24 border-b border-white/5">
          {cta.background_image && (
            <div className="absolute inset-0 z-0">
              {/* Decorative banner backdrop; below the fold so it stays lazy.
                  Dashboard uploads live on another host, so skip the optimizer for those. */}
              <Image
                src={cta.background_image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center"
                unoptimized={/^(https?:)?\/\//i.test(cta.background_image)}
              />
            </div>
          )}
          <div className="absolute inset-0 z-0 bg-[#0B1120]/80 mix-blend-multiply" />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0B1120] to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left max-w-2xl">
              <h2 className="aloevera-light text-white text-4xl sm:text-5xl lg:text-[55px] leading-tight mb-4">
                <HighlightedHeading text={cta.heading} highlight={cta.highlight} />
              </h2>
              {cta.description && (
                <p className="font-lato font-light text-gray-300 text-base sm:text-lg max-w-lg mx-auto md:mx-0">
                  {cta.description}
                </p>
              )}
            </div>

            {cta.button_label && cta.button_href && (
              <div className="flex-shrink-0">
                <SiteLink
                  href={cta.button_href}
                  className="group relative inline-flex items-center justify-center px-8 py-4 font-medium text-white transition-all duration-300 overflow-hidden rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(200,60,100,0.4)]"
                  style={{ backgroundColor: '#C83C64' }}
                >
                  <span className="relative flex items-center gap-3">
                    {cta.button_label}
                    <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </SiteLink>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── MAIN FOOTER CONTENT ─────────────────────────────────────────────── */}
      <div className="pt-20 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

            {/* Brand & Description */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 lg:pr-8">
              {footer.logo && (
                <Link href="/" className="inline-block mb-6">
                  <img src={footer.logo} alt="Luxume Roofing" width={120} height={48} className="h-12 w-auto drop-shadow-md" />
                </Link>
              )}
              {footer.description && (
                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">{footer.description}</p>
              )}

              {/* Socials */}
              {socials.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {socials.map(({ href, meta: { Icon, color, label } }, index) => (
                    <a
                      key={index}
                      href={href}
                      target={opensNewTab(href) ? '_blank' : undefined}
                      rel={opensNewTab(href) ? 'noopener noreferrer' : undefined}
                      aria-label={label}
                      className="group w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:border-white/20"
                    >
                      <Icon className="text-sm transition-colors duration-300" onMouseEnter={(e) => e.currentTarget.style.color = color} onMouseLeave={(e) => e.currentTarget.style.color = ''} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Link columns: share the space between the brand and contact columns */}
            {columns.length > 0 && (
              <div
                className={`col-span-1 md:col-span-2 ${showContact ? 'lg:col-span-5' : 'lg:col-span-8'} grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-8 lg:[grid-template-columns:var(--footer-cols)]`}
                style={{ '--footer-cols': `repeat(${columns.length}, minmax(0, 1fr))` }}
              >
                {columns.map((col, colIndex) => (
                  <div key={`${colIndex}-${col.title}`}>
                    {col.title && (
                      <h4 className="aloevera-medium text-white text-lg mb-6 tracking-wider">{col.title}</h4>
                    )}
                    <ul className="space-y-3">
                      {col.loading
                        ? Array.from({ length: 3 }).map((_, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-3 h-[1px] bg-white/10 rounded" />
                              <span className="h-3 rounded bg-white/10 animate-pulse" style={{ width: `${60 + i * 20}%` }} />
                            </li>
                          ))
                        : col.links.map((link) => (
                            <li key={link.key}>
                              <SiteLink
                                href={link.href}
                                className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors duration-300"
                              >
                                <span className="w-0 h-[1px] bg-[#C83C64] mr-0 transition-all duration-300 group-hover:w-3 group-hover:mr-2" />
                                {link.label}
                              </SiteLink>
                            </li>
                          ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Contact & Newsletter */}
            {showContact && (
              <div className="lg:col-span-3">
                {contact.heading && (
                  <h4 className="aloevera-medium text-white text-lg mb-6 tracking-wider">{contact.heading}</h4>
                )}
                {(contact.address || contact.phone || contact.email) && (
                  <ul className="space-y-4 mb-8">
                    {contact.address && (
                      <li className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5" style={{ color: '#C83C64' }}>
                          <FaMapMarkerAlt className="text-sm" />
                        </div>
                        <span className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{contact.address}</span>
                      </li>
                    )}
                    {contact.phone && (
                      <li className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0" style={{ color: '#C83C64' }}>
                          <FaPhoneAlt className="text-sm" />
                        </div>
                        <a href={telHref(contact.phone)} className="text-sm text-gray-400 hover:text-white transition-colors">{contact.phone}</a>
                      </li>
                    )}
                    {contact.email && (
                      <li className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0" style={{ color: '#C83C64' }}>
                          <FaEnvelope className="text-sm" />
                        </div>
                        <a href={`mailto:${contact.email}`} className="text-sm text-gray-400 hover:text-white transition-colors break-all">{contact.email}</a>
                      </li>
                    )}
                  </ul>
                )}

                {showNewsletter && (
                  <form onSubmit={handleSubscribe} className="relative mt-8">
                    {newsletter.label && (
                      <label htmlFor="footer-newsletter-email" className="block text-xs uppercase tracking-wider text-gray-500 mb-2">
                        {newsletter.label}
                      </label>
                    )}
                    <div className="relative">
                      <input
                        id="footer-newsletter-email"
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
                        aria-label="Subscribe"
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
                )}
              </div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500 text-center md:text-left">
              {footerBottom.copyright && <>&copy; {new Date().getFullYear()} {footerBottom.copyright}</>}
              {dev.label && (
                <>
                  {footerBottom.copyright && (
                    <>
                      <span className="mx-2 hidden sm:inline">|</span>
                      <br className="sm:hidden" />
                    </>
                  )}
                  {dev.prefix && <>{dev.prefix}{' '}</>}
                  {dev.url ? (
                    <a
                      href={dev.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white font-medium transition-colors"
                    >
                      {dev.label}
                    </a>
                  ) : (
                    <span className="text-gray-400 font-medium">{dev.label}</span>
                  )}
                </>
              )}
            </p>
            {bottomLinks.length > 0 && (
              <div className="flex flex-wrap justify-center gap-6">
                {bottomLinks.map((link) => (
                  <SiteLink key={link.key} href={link.href} className="text-xs text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </SiteLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
