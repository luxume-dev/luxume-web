'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, priority = false }) {
  return (
    <Link href={`/products/${product.slug}`} className="block">
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100 cursor-pointer">
      {/* Image Container */}
      <div className="relative h-80 w-full overflow-hidden">
        {product.cover_image_url ? (
          <Image
            src={product.cover_image_url}
            alt={product.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}

      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-[20px] font-bold text-[#1a1b4b] mb-3 font-lato leading-tight">
          {product.title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6 text-[14px] font-lato font-normal line-clamp-3">
          {product.description}
        </p>

        {/* Button */}
        <div className="w-full mt-auto bg-[#C83C64] hover:bg-[#a62f50] text-white py-3.5 rounded-xl font-medium transition-colors duration-300 flex items-center justify-center gap-2 group-hover:gap-3">
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
        </div>
      </div>
    </div>
    </Link>
  );
}
