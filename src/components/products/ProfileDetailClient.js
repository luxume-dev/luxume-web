'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import RequestQuoteModal from '@/components/RequestQuoteModal';
import { iconSrc } from '@/lib/cmsList';

const Badge = ({ children }) => (
  <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
    {children}
  </span>
);

/**
 * Profile detail page. `profile` comes from lib/profileDetail.js
 * (profileDetailContent); every section is hidden when its content is empty.
 * `children` (bottom content + FAQs from page_seo) render after the gallery.
 */
export default function ProfileDetailClient({ profile, brand, brandHref, children }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const { overview, features, specs, applications, gallery } = profile;

  const hasOverview = overview.heading || overview.lead || overview.paragraphs.length || overview.highlights.length;
  const hasSpecsRow = specs.items.length > 0 || applications.items.length > 0;

  return (
    <main className="bg-white pt-20">
      {/* Title, description and image */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className={`max-w-7xl mx-auto grid grid-cols-1 gap-10 items-center ${profile.image ? 'lg:grid-cols-2' : ''}`}>
          <div>
            <p className="font-lato text-gray-500 text-sm mb-3 tracking-wide uppercase">
              <Link href="/products" className="hover:text-[#C83C64] transition-colors">Products</Link>
              &nbsp;/&nbsp;
              <Link href={brandHref} className="hover:text-[#C83C64] transition-colors">{brand}</Link>
              &nbsp;/&nbsp;
              <span className="text-gray-900 font-semibold">{profile.title}</span>
            </p>
            <h1 className="font-aloevera text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: '#1a1b4b' }}>
              {profile.title}
            </h1>
            {profile.description && (
              <div className="relative mb-8">
                <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full" style={{ backgroundColor: '#C83C64' }} />
                <p className="font-lato text-gray-700 leading-relaxed text-lg pl-6 whitespace-pre-line">{profile.description}</p>
              </div>
            )}
            <button
              onClick={() => setQuoteOpen(true)}
              className="px-10 py-3.5 rounded-[16px] text-white font-lato font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: '#C83C64' }}
            >
              Request Quote
            </button>
          </div>
          {profile.image && (
            <div className="relative h-[320px] md:h-[440px] rounded-3xl overflow-hidden bg-gray-50 shadow-xl">
              <Image src={profile.image} alt={profile.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* Overview */}
      {hasOverview && (
        <section className="py-16 px-4 md:px-8 bg-stone-100">
          <div className="max-w-7xl mx-auto">
            {overview.label && <Badge>{overview.label}</Badge>}
            {overview.heading && (
              <h2 className="font-aloevera text-3xl md:text-4xl font-bold mt-2 mb-6" style={{ color: '#1a1b4b' }}>
                {overview.heading}
              </h2>
            )}
            {overview.lead && (
              <div className="relative mb-8">
                <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full" style={{ backgroundColor: '#C83C64' }} />
                <p className="font-lato text-gray-800 leading-relaxed text-lg md:text-xl font-medium pl-6">{overview.lead}</p>
              </div>
            )}
            {overview.paragraphs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mb-10">
                {overview.paragraphs.map((text, i) => (
                  <p key={i} className="font-lato text-gray-600 leading-relaxed whitespace-pre-line">{text}</p>
                ))}
              </div>
            )}
            {overview.highlights.length > 0 && (
              <ul className="flex flex-wrap gap-3">
                {overview.highlights.map((item, i) => (
                  <li key={`${item}-${i}`} className="flex items-center gap-2 font-lato text-sm font-semibold px-4 py-2 rounded-full bg-white border border-pink-100" style={{ color: '#1a1b4b' }}>
                    <CheckCircle size={16} className="text-[#C83C64] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* Features */}
      {features.items.length > 0 && (
        <section className="py-16 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
          <div className="max-w-7xl mx-auto">
            {features.label && <Badge>{features.label}</Badge>}
            {features.title && (
              <h2 className="font-aloevera text-3xl md:text-4xl font-bold mt-2 mb-12" style={{ color: '#1a1b4b' }}>
                {features.title}
              </h2>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.items.map((item, i) => {
                const src = iconSrc(item.icon, '#C83C64');
                return (
                  <div key={`${item.title}-${i}`} className="bg-white p-7 rounded-2xl border border-gray-100 hover:border-pink-100 hover:shadow-lg transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: '#FEF2F2', color: '#C83C64' }}>
                      {src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={src} alt="" aria-hidden="true" className="w-[22px] h-[22px] object-contain" />
                      ) : (
                        <CheckCircle size={22} />
                      )}
                    </div>
                    {item.title && <h3 className="font-aloevera text-lg font-bold mb-2" style={{ color: '#1a1b4b' }}>{item.title}</h3>}
                    {item.description && <p className="font-lato text-gray-500 leading-relaxed text-sm whitespace-pre-line">{item.description}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Specifications and applications */}
      {hasSpecsRow && (
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            {specs.items.length > 0 && (
              <div className={applications.items.length ? 'lg:col-span-2' : 'lg:col-span-3'}>
                {specs.title && (
                  <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-8" style={{ color: '#C83C64' }}>
                    {specs.title}
                  </h2>
                )}
                <dl className="rounded-2xl border border-gray-100 overflow-hidden">
                  {specs.items.map(({ label, value }, i) => (
                    <div key={`${label}-${i}`} className={`grid grid-cols-2 gap-4 px-6 py-4 font-lato ${i % 2 ? 'bg-white' : 'bg-gray-50'}`}>
                      <dt className="text-gray-500">{label}</dt>
                      <dd className="font-semibold" style={{ color: '#0F172B' }}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
            {applications.items.length > 0 && (
              <div className={specs.items.length ? '' : 'lg:col-span-3'}>
                {applications.title && (
                  <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-8" style={{ color: '#C83C64' }}>
                    {applications.title}
                  </h2>
                )}
                <ul className="space-y-3">
                  {applications.items.map((app, i) => (
                    <li key={`${app}-${i}`} className="flex items-center gap-3 font-lato text-gray-700">
                      <CheckCircle size={18} className="text-[#C83C64] shrink-0" />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.items.length > 0 && (
        <section className="py-16 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
          <div className="max-w-7xl mx-auto">
            {gallery.title && (
              <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: '#C83C64' }}>
                {gallery.title}
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gallery.items.map((img, i) => (
                <div key={`${img.src}-${i}`} className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                  <Image src={img.src} alt={img.alt || profile.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom content and FAQs (from the page SEO), rendered by the page */}
      {children}

      <RequestQuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        productName={brand}
        profileType={profile.title}
      />
    </main>
  );
}
