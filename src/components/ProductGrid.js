'use client';

import { products } from '@/data/products';

export default function ProductGrid() {
  return (
    <section className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              style={{ border: '1px solid #f0f0f0' }}
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-gray-200 animate-pulse" 
                  aria-hidden="true" 
                /> {/* Placeholder while loading (optional improvement) */}
                <img 
                  src={product.imageUrl} 
                  alt={product.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                      style={{ 
                        background: 'linear-gradient(90deg, #1C1E54 0%, #2a2d7a 100%)'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 
                  className="text-xl md:text-2xl font-bold mb-3 font-aloevera leading-tight"
                  style={{ color: '#1C1E54' }}
                >
                  {product.title}
                </h3>
                
                <p 
                  className="text-sm md:text-base leading-relaxed mb-6"
                  style={{ color: '#4A5565' }}
                >
                  {product.description}
                </p>

                <button 
                  className="w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:opacity-90 active:scale-95"
                  style={{ background: '#C83C64' }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
