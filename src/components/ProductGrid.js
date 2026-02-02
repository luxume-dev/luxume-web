'use client';

import { products } from '@/data/products';
import ProductCard from './ProductCard';

export default function ProductGrid() {
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
