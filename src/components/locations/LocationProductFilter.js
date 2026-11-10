'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, LayoutGrid, Layers, ArrowRight, X } from 'lucide-react';

/**
 * Client-side filter for the products and profiles sold in one location.
 * `products` (brands from the dashboard) is already narrowed to this location
 * (see getProductsForLocation). The chips filter by brand.
 */
export default function LocationProductFilter({ products, locationSlug, locationName }) {
  const [query, setQuery] = useState('');
  const [brand, setBrand] = useState('all');
  const [view, setView] = useState('products');

  const brands = useMemo(() => products.map((p) => ({ slug: p.slug, title: p.title })), [products]);

  const q = query.trim().toLowerCase();
  const matches = (...fields) => !q || fields.some((f) => f?.toLowerCase().includes(q));

  const filteredProducts = products.filter(
    (p) =>
      (brand === 'all' || p.slug === brand) &&
      matches(p.title, p.description, ...p.profiles.map((pr) => pr.title)),
  );

  const filteredProfiles = products
    .filter((p) => brand === 'all' || p.slug === brand)
    .flatMap((p) => p.profiles.map((profile) => ({ ...profile, product: p })))
    .filter((pr) => matches(pr.title, pr.description, pr.product.title));

  const resultCount = view === 'products' ? filteredProducts.length : filteredProfiles.length;
  const hasFilters = q || brand !== 'all';

  const chip = (active) =>
    `px-4 py-2 rounded-full font-lato text-sm font-semibold border transition-colors ${
      active
        ? 'bg-[#C83C64] border-[#C83C64] text-white'
        : 'bg-white border-gray-200 text-gray-600 hover:border-[#C83C64] hover:text-[#C83C64]'
    }`;

  return (
    <section className="py-16 px-4 md:px-8 bg-white" id="products">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <span className="inline-block font-lato text-xs font-bold uppercase tracking-widest text-[#C83C64] mb-3 px-3 py-1 rounded-full bg-pink-50 border border-pink-100">
              Available in {locationName}
            </span>
            <h2 className="font-aloevera text-3xl md:text-4xl font-bold" style={{ color: '#1a1b4b' }}>
              Products &amp; profiles in {locationName}
            </h2>
          </div>

          {/* View toggle */}
          <div className="inline-flex p-1 rounded-xl bg-gray-100 self-start lg:self-auto" role="tablist">
            {[
              { key: 'products', label: 'Products', Icon: LayoutGrid },
              { key: 'profiles', label: 'Profiles', Icon: Layers },
            ].map(({ key, label, Icon }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={view === key}
                onClick={() => setView(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-lato text-sm font-semibold transition-all ${
                  view === key ? 'bg-white shadow text-[#1a1b4b]' : 'text-gray-500 hover:text-[#1a1b4b]'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <label className="relative md:w-80 shrink-0">
            <span className="sr-only">Search products and profiles</span>
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products or profiles"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 font-lato text-gray-800 focus:outline-none focus:border-[#C83C64] placeholder:text-gray-400"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={chip(brand === 'all')} onClick={() => setBrand('all')}>
              All
            </button>
            {brands.map((b) => (
              <button key={b.slug} type="button" className={chip(brand === b.slug)} onClick={() => setBrand(b.slug)}>
                {b.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8 font-lato text-sm text-gray-500">
          <span>
            {resultCount} {view === 'products' ? 'product' : 'profile'}
            {resultCount === 1 ? '' : 's'} found
          </span>
          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setBrand('all');
              }}
              className="flex items-center gap-1 text-[#C83C64] font-semibold hover:underline"
            >
              <X size={14} /> Clear filters
            </button>
          )}
        </div>

        {resultCount === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-gray-50 font-lato text-gray-500">
            No matches in {locationName}. Try a different search or brand.
          </div>
        ) : view === 'products' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/locations/${locationSlug}/${p.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 bg-gray-100 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 font-lato text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-[#1a1b4b]">
                    {p.profiles.length} profile{p.profiles.length === 1 ? '' : 's'}
                  </span>
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-[20px] font-bold text-[#1a1b4b] mb-3 font-lato leading-tight">{p.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-5 text-[14px] font-lato line-clamp-3">{p.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.profiles.map((pr) => (
                      <span
                        key={pr.slug}
                        className="font-lato text-xs font-semibold px-3 py-1 rounded-full bg-pink-50 text-[#C83C64] border border-pink-100"
                      >
                        {pr.title}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto w-full bg-[#C83C64] group-hover:bg-[#a62f50] text-white py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 group-hover:gap-3">
                    View in {locationName}
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProfiles.map((pr) => (
              <Link
                key={`${pr.product.slug}-${pr.slug}`}
                href={`/locations/${locationSlug}/${pr.product.slug}#${pr.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-pink-100 hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative h-44 bg-gray-100 overflow-hidden">
                  <Image
                    src={pr.image}
                    alt={`${pr.title} – ${pr.product.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <p className="font-lato text-xs font-bold uppercase tracking-wider text-[#C83C64] mb-1">
                    {pr.product.title}
                  </p>
                  <h3 className="font-aloevera text-lg font-bold mb-2" style={{ color: '#1a1b4b' }}>
                    {pr.title}
                  </h3>
                  {pr.description && (
                    <p className="font-lato text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{pr.description}</p>
                  )}
                  <span className="mt-auto flex items-center gap-1.5 font-lato text-sm font-semibold text-[#C83C64]">
                    View in {locationName} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
