'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ShieldCheck, Droplets, Wrench, Ruler, Sun } from 'lucide-react';
import RequestQuoteModal from '@/components/RequestQuoteModal';

// shortcut: content is hardcoded, move to the dashboard `profiles` table when profiles need their own pages
const profile = {
  title: 'Trapezoidal Profile',
  brand: 'Luxume+',
  brandHref: '/products',
  image: '/images/productdetail.png',
  description:
    'The Luxume trapezoidal profile combines tall, evenly spaced ribs with wide flat pans to give a roof that is strong, light and quick to install. It sheds rainwater fast, spans further between purlins, and suits homes, warehouses, factories and farm buildings alike.',
  features: [
    { Icon: ShieldCheck, title: 'High load capacity', description: 'Deep ribs stiffen the sheet so it carries wind and maintenance loads over wider purlin spacing.' },
    { Icon: Droplets, title: 'Fast water drainage', description: 'Wide pans and raised crests channel heavy monsoon rain off the roof without pooling.' },
    { Icon: Wrench, title: 'Quick installation', description: 'Large cover width and simple side laps mean fewer sheets and fewer fasteners per square metre.' },
    { Icon: Sun, title: 'Heat reflective finish', description: 'Colour coating reflects solar heat, keeping interiors cooler through the summer.' },
    { Icon: Ruler, title: 'Cut to length', description: 'Sheets are roll-formed to the exact length your roof needs, cutting site waste.' },
    { Icon: CheckCircle, title: 'Long service life', description: 'Aluminium-zinc coated base steel resists corrosion even in coastal climates.' },
  ],
  specifications: [
    ['Overall width', '1120 mm'],
    ['Effective cover width', '1050 mm'],
    ['Rib height', '28 mm'],
    ['Rib pitch', '195 mm'],
    ['Thickness', '0.35 mm – 0.50 mm'],
    ['Length', 'Custom, up to 12 m'],
    ['Minimum roof slope', '5°'],
    ['Base coating', 'AZ150 aluminium-zinc'],
  ],
  applications: ['Residential roofing', 'Industrial sheds', 'Warehouses', 'Agricultural buildings', 'Wall cladding'],
  gallery: [
    { src: '/images/roof-images/brick-red.webp', alt: 'House roofed with brick red trapezoidal sheets' },
    { src: '/images/roof-images/pencil-grey.webp', alt: 'House roofed with pencil grey trapezoidal sheets' },
    { src: '/images/roof-images/leaf-green.webp', alt: 'House roofed with leaf green trapezoidal sheets' },
  ],
};

export default function ProfileDetailClient() {
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <main className="bg-white pt-20">
      {/* Title, description and image */}
      <section className="py-12 md:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="font-lato text-gray-500 text-sm mb-3 tracking-wide uppercase">
              <Link href="/products" className="hover:text-[#C83C64] transition-colors">Products</Link>
              &nbsp;/&nbsp;
              <Link href={profile.brandHref} className="hover:text-[#C83C64] transition-colors">{profile.brand}</Link>
              &nbsp;/&nbsp;
              <span className="text-gray-900 font-semibold">{profile.title}</span>
            </p>
            <h1 className="font-aloevera text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: '#1a1b4b' }}>
              {profile.title}
            </h1>
            <div className="relative mb-8">
              <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full" style={{ backgroundColor: '#C83C64' }} />
              <p className="font-lato text-gray-700 leading-relaxed text-lg pl-6">{profile.description}</p>
            </div>
            <button
              onClick={() => setQuoteOpen(true)}
              className="px-10 py-3.5 rounded-[16px] text-white font-lato font-semibold transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: '#C83C64' }}
            >
              Request Quote
            </button>
          </div>
          <div className="relative h-[320px] md:h-[440px] rounded-3xl overflow-hidden bg-gray-50 shadow-xl">
            <Image src={profile.image} alt={profile.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
        <div className="max-w-7xl mx-auto">
          <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
            Key Features &amp; Benefits
          </span>
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold mt-2 mb-12" style={{ color: '#1a1b4b' }}>
            Why choose the {profile.title}?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.features.map(({ Icon, title, description }) => (
              <div key={title} className="bg-white p-7 rounded-2xl border border-gray-100 hover:border-pink-100 hover:shadow-lg transition-all duration-300">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ backgroundColor: '#FEF2F2', color: '#C83C64' }}>
                  <Icon size={22} />
                </div>
                <h3 className="font-aloevera text-lg font-bold mb-2" style={{ color: '#1a1b4b' }}>{title}</h3>
                <p className="font-lato text-gray-500 leading-relaxed text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications and applications */}
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-8" style={{ color: '#C83C64' }}>
              Technical Specifications
            </h2>
            <dl className="rounded-2xl border border-gray-100 overflow-hidden">
              {profile.specifications.map(([label, value], i) => (
                <div key={label} className={`grid grid-cols-2 gap-4 px-6 py-4 font-lato ${i % 2 ? 'bg-white' : 'bg-gray-50'}`}>
                  <dt className="text-gray-500">{label}</dt>
                  <dd className="font-semibold" style={{ color: '#0F172B' }}>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-8" style={{ color: '#C83C64' }}>
              Applications
            </h2>
            <ul className="space-y-3">
              {profile.applications.map((app) => (
                <li key={app} className="flex items-center gap-3 font-lato text-gray-700">
                  <CheckCircle size={18} className="text-[#C83C64] shrink-0" />
                  {app}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 md:px-8" style={{ backgroundColor: '#f8f7ff' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: '#C83C64' }}>
            See It on a Roof
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profile.gallery.map((img) => (
              <div key={img.src} className="relative h-64 rounded-2xl overflow-hidden shadow-md">
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <RequestQuoteModal
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        productName={profile.brand}
        profileType={profile.title}
      />
    </main>
  );
}
