'use client';

import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';

/* ─── Shimmer skeleton that mirrors ProductCard layout ─── */
function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
      {/* Image placeholder */}
      <div className="relative h-80 w-full overflow-hidden bg-gray-100">
        <div className="absolute inset-0 skeleton-shimmer" />
      </div>

      {/* Content placeholder */}
      <div className="p-8 flex flex-col flex-grow gap-4">
        {/* Title */}
        <div className="relative h-6 w-3/4 rounded-lg bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>

        {/* Description lines */}
        <div className="space-y-2">
          <div className="relative h-3.5 w-full rounded-md bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          <div className="relative h-3.5 w-5/6 rounded-md bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
          <div className="relative h-3.5 w-4/6 rounded-md bg-gray-100 overflow-hidden">
            <div className="absolute inset-0 skeleton-shimmer" />
          </div>
        </div>

        {/* Button */}
        <div className="relative mt-auto h-12 w-full rounded-xl bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 skeleton-shimmer" />
        </div>
      </div>

      <style jsx>{`
        @keyframes skshimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .skeleton-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.7) 50%,
            transparent 100%
          );
          animation: skshimmer 1.4s infinite;
        }
      `}</style>
    </div>
  );
}

export default function ProductGrid() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products?.length) {
    return (
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>No products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-8 pb-16 md:pt-12 md:pb-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index <= 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
