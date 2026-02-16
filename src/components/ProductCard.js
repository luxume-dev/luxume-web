'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }) {
  // Use features array as tags (show first 3)
  const tags = Array.isArray(product.features) ? product.features.slice(0, 3) : [];

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100">
      {/* Image Container */}
      <div className="relative h-80 w-full overflow-hidden">
        {product.product_image_url ? (
          <Image
            src={product.product_image_url}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {/* Luxume Badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-[#C83C64] px-6 py-1.5 rounded-full text-sm font-medium shadow-sm">
            Luxume
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-[20px] font-bold text-[#1a1b4b] mb-3 font-lato leading-tight">
          {product.title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6 text-[14px] font-lato font-normal line-clamp-3">
          {product.description}
        </p>

        {/* Feature Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 mt-auto">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-[12px] font-lato font-normal px-4 py-2 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Button */}
        <Link href={`/products/${product.slug}`}>
          <button className="w-full bg-[#C83C64] hover:bg-[#a62f50] text-white py-3.5 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
            Learn More
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M5 12h14m-7-7 7 7-7 7"/>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
