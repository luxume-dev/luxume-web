'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, priority = false }) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100 cursor-pointer">
      {/* Image Container */}
      <div className="relative h-80 w-full overflow-hidden bg-gray-100">
        {product.cover_image_url ? (
          <>
            {/* Shimmer overlay — fades away once image is loaded */}
            {!isImgLoaded && (
              <div className="absolute inset-0 z-10 card-img-shimmer" />
            )}
            <Image
              src={product.cover_image_url}
              alt={product.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={`object-cover transition-all duration-700 group-hover:scale-105 ${
                isImgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setIsImgLoaded(true)}
            />
          </>
        ) : (
          /* Styled no-image fallback */
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300 bg-gray-50">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span className="text-xs font-lato">No image</span>
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

      <style jsx>{`
        @keyframes cardshimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .card-img-shimmer {
          background: #f3f4f6;
        }
        .card-img-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.75) 50%,
            transparent 100%
          );
          animation: cardshimmer 1.4s infinite;
        }
      `}</style>
    </div>
    </Link>
  );
}
