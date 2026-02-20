'use client';

import { useProducts } from '@/hooks/useProducts';
import ProductCard from './ProductCard';

export default function ProductGrid() {
  const { data: products, isLoading } = useProducts();

  if (isLoading) {
    return (
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                <div className="h-80 bg-gray-200" />
                <div className="p-8 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-8 bg-gray-200 rounded-full w-24" />
                    <div className="h-8 bg-gray-200 rounded-full w-20" />
                  </div>
                  <div className="h-12 bg-gray-200 rounded-xl mt-6" />
                </div>
              </div>
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
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
