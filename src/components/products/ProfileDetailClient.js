'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ShieldCheck, Droplets, Wrench, Ruler, Sun } from 'lucide-react';
import RequestQuoteModal from '@/components/RequestQuoteModal';

// shortcut: content is hardcoded, move to the dashboard `profiles` table when profiles need their own pages
const staticProfile = {
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
  // short SEO copy shown between the hero and Key Features
  overview: {
    label: 'Product Overview',
    heading: 'Strong, Lightweight Trapezoidal Roofing Sheets',
    lead:
      'Luxume trapezoidal roofing sheets are designed for builders, contractors and homeowners who want a roof that performs for decades without adding unnecessary weight to the structure.',
    paragraphs: [
      'The trapezoidal rib design adds rigidity to every sheet, allowing wider purlin spacing and reducing the overall cost of the roofing frame. Fewer purlins, fewer fasteners and fewer sheets per square metre mean faster installation and lower labour costs on site.',
      'Each sheet is roll-formed from premium aluminium-zinc coated steel and finished with a weather-resistant colour coating that protects against rust, fading and heat. The coating system is engineered to handle heavy monsoon rain, strong UV exposure and humid coastal air.',
      'Whether you are roofing a new home, re-roofing an old building, covering a car porch or putting up a large industrial shed, the Luxume trapezoidal profile gives you a dependable, low-maintenance roof at a competitive price.',
      'Sheets are available in multiple thicknesses and a wide palette of colours, and every order is cut to the exact length of your roof. Our team and dealer network help you choose the right specification for your building and budget.',
    ],
    highlights: ['Wider purlin spacing', 'Rust-resistant AZ150 base', 'Cut to exact length', 'Wide colour range'],
  },
  // long-form SEO copy: each block renders as an h3 + paragraphs
  about: {
    heading: 'About the Luxume Trapezoidal Roofing Profile',
    intro:
      'Trapezoidal roofing sheets are one of the most widely used metal roofing profiles in India, and for good reason. Their geometric rib pattern gives exceptional strength for the weight of steel used, making them a cost-effective choice for everything from a home extension to a large industrial shed.',
    blocks: [
      {
        title: 'What is a trapezoidal roofing sheet?',
        paragraphs: [
          'A trapezoidal sheet is a roll-formed metal sheet whose ribs are shaped like a trapezium: a flat top, two angled sides and a wide flat pan between each rib. This shape increases the stiffness of the sheet many times over compared to a flat sheet of the same thickness, which is why trapezoidal profiles can span longer distances between purlins.',
          'Luxume trapezoidal sheets are roll-formed from high-tensile, aluminium-zinc coated steel and finished with a durable colour coating, giving you a roof that is light, strong and attractive.',
        ],
      },
      {
        title: 'Built for Indian weather',
        paragraphs: [
          'From heavy monsoon rain to intense summer heat and salty coastal air, roofs in India face tough conditions. The deep ribs of the Luxume trapezoidal profile carry water away quickly, the AZ150 aluminium-zinc base coating protects against rust, and the heat-reflective paint system helps keep the building below cooler.',
        ],
      },
      {
        title: 'Where to use trapezoidal sheets',
        paragraphs: [
          'Trapezoidal profiles are popular for residential roofs, car porches, warehouses, factories, cold storage units, poultry and dairy farms, commercial complexes and pre-engineered buildings. They can also be used as wall cladding to give a building a clean, modern façade that matches the roof.',
        ],
      },
      {
        title: 'Choosing the right thickness and colour',
        paragraphs: [
          'For most homes and light structures, 0.35 mm to 0.40 mm sheets give an excellent balance of strength and cost. For industrial roofs, wider purlin spacing or areas with high wind loads, 0.45 mm to 0.50 mm sheets are recommended. Luxume offers a wide range of colours, from classic brick red and leaf green to modern greys, so you can match the roof to your building design.',
        ],
      },
      {
        title: 'Installation and maintenance',
        paragraphs: [
          'Each sheet is cut to the exact length of your roof, reducing joints and site waste. Sheets are fixed to purlins using self-drilling screws with EPDM washers for a watertight seal. Once installed, a Luxume roof needs very little care: an occasional rinse to remove dust and leaves is usually all it takes to keep it looking new for years.',
        ],
      },
      {
        title: 'Why buy from Luxume?',
        paragraphs: [
          'Luxume roofing sheets are manufactured using quality-controlled raw material and modern roll-forming lines, and are backed by our dealer network for quick supply and on-site support. Request a quote today to get pricing for your project, along with expert advice on the right profile, thickness and colour.',
        ],
      },
    ],
  },
  gallery: [
    { src: '/images/roof-images/brick-red.webp', alt: 'House roofed with brick red trapezoidal sheets' },
    { src: '/images/roof-images/pencil-grey.webp', alt: 'House roofed with pencil grey trapezoidal sheets' },
    { src: '/images/roof-images/leaf-green.webp', alt: 'House roofed with leaf green trapezoidal sheets' },
  ],
};

/**
 * Title, brand, image and description come from the clicked profile/brand when
 * given; everything else is the shared static copy above.
 */
export default function ProfileDetailClient({ title, brand, brandHref, image, description } = {}) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const profile = {
    ...staticProfile,
    title: title || staticProfile.title,
    brand: brand || staticProfile.brand,
    brandHref: brandHref || staticProfile.brandHref,
    image: image || staticProfile.image,
    description: description || staticProfile.description,
  };

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

      {/* Overview / SEO content above features */}
      <section className="py-16 px-4 md:px-8 bg-stone-100">
        <div className="max-w-7xl mx-auto">
          <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
            {profile.overview.label}
          </span>
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold mt-2 mb-6" style={{ color: '#1a1b4b' }}>
            {profile.overview.heading}
          </h2>
          <div className="relative mb-8">
            <div className="absolute left-0 top-1 bottom-1 w-1 rounded-full" style={{ backgroundColor: '#C83C64' }} />
            <p className="font-lato text-gray-800 leading-relaxed text-lg md:text-xl font-medium pl-6">{profile.overview.lead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5 mb-10">
            {profile.overview.paragraphs.map((text, i) => (
              <p key={i} className="font-lato text-gray-600 leading-relaxed">{text}</p>
            ))}
          </div>
          <ul className="flex flex-wrap gap-3">
            {profile.overview.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 font-lato text-sm font-semibold px-4 py-2 rounded-full bg-white border border-pink-100" style={{ color: '#1a1b4b' }}>
                <CheckCircle size={16} className="text-[#C83C64] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
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

      {/* Descriptive / SEO content */}
      <section className="py-16 px-4 md:px-8">
        <article className="max-w-7xl mx-auto">
          <h2 className="font-aloevera text-3xl md:text-4xl font-bold mb-6" style={{ color: '#1a1b4b' }}>
            {profile.about.heading}
          </h2>
          <p className="font-lato text-gray-700 leading-relaxed text-lg mb-10">{profile.about.intro}</p>
          <div className="space-y-8">
            {profile.about.blocks.map((block) => (
              <div key={block.title}>
                <h3 className="font-aloevera text-xl md:text-2xl font-bold mb-3" style={{ color: '#C83C64' }}>
                  {block.title}
                </h3>
                {block.paragraphs.map((text, i) => (
                  <p key={i} className="font-lato text-gray-600 leading-relaxed mb-3 last:mb-0">{text}</p>
                ))}
              </div>
            ))}
          </div>
        </article>
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
