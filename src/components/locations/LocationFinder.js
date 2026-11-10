'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Package, ArrowRight } from 'lucide-react';

/**
 * Pick a location (and optionally a product sold there) and jump to
 * /[location] (e.g. /ernakulam), or straight to /products/[product] when one is chosen.
 *
 * `locations` is [{ slug, name, products: [{ slug, title }] }].
 */
export default function LocationFinder({ locations, defaultLocation = '' }) {
  const router = useRouter();
  const [location, setLocation] = useState(defaultLocation);
  const [product, setProduct] = useState('');

  const products = useMemo(
    () => locations.find((l) => l.slug === location)?.products ?? [],
    [locations, location],
  );

  const go = (e) => {
    e.preventDefault();
    if (!location) return;
    router.push(product ? `/products/${product}` : `/${location}`);
  };

  const selectClass =
    'w-full appearance-none bg-white pl-11 pr-4 py-3.5 rounded-xl border border-gray-200 font-lato text-gray-800 focus:outline-none focus:border-[#C83C64] disabled:bg-gray-50 disabled:text-gray-400';

  return (
    <form
      onSubmit={go}
      className="bg-white rounded-2xl shadow-xl p-4 md:p-5 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-3 max-w-3xl"
    >
      <label className="relative">
        <span className="sr-only">Location</span>
        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C83C64] pointer-events-none" />
        <select
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setProduct('');
          }}
          className={selectClass}
        >
          <option value="">Select location</option>
          {locations.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </select>
      </label>

      <label className="relative">
        <span className="sr-only">Product</span>
        <Package size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C83C64] pointer-events-none" />
        <select
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          disabled={!location}
          className={selectClass}
        >
          <option value="">All products</option>
          {products.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
      </label>

      <button
        type="submit"
        disabled={!location}
        className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#C83C64] hover:bg-[#a62f50] text-white font-lato font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Find
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
