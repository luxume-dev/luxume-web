'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useBlogs } from '@/hooks/useBlogs';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function BlogSection() {
  const { data: blogs = [], isLoading: loading } = useBlogs();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sectionRef = useRef(null);
  const filtersRef = useRef(null);
  const searchRef = useRef(null);
  const cardRefs = useRef([]);

  // Animate filters + search on mount
  useEffect(() => {
    if (loading || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Category filter tabs — staggered slide-in from left
      if (filtersRef.current) {
        const filterBtns = filtersRef.current.querySelectorAll('button');
        gsap.fromTo(filterBtns,
          { opacity: 0, x: -30, scale: 0.8 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: filtersRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Search bar — fade + slide from right
      if (searchRef.current) {
        gsap.fromTo(searchRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: searchRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loading]);

  // Animate blog cards whenever filtered content changes
  useEffect(() => {
    if (loading || !sectionRef.current) return;

    // Small delay to let DOM update with new cards
    const timer = setTimeout(() => {
      const validCards = cardRefs.current.filter(Boolean);
      if (validCards.length === 0) return;

      gsap.fromTo(validCards,
        {
          opacity: 0,
          y: 60,
          rotateX: 15,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
        }
      );
    }, 50);

    return () => clearTimeout(timer);
  }, [loading, activeCategory, searchQuery]);

  // Derive unique categories from fetched blogs
  const categories = [
    { id: 'all', label: 'All' },
    ...Array.from(
      new Map(
        blogs
          .filter((b) => b.category)
          .map((b) => [b.category.id, { id: b.category.slug, label: b.category.name }])
      ).values()
    ),
  ];

  // Extract first paragraph text from content blocks
  function getFirstParagraph(content) {
    if (!Array.isArray(content)) return '';
    const para = content.find((block) => block.type === 'paragraph');
    return para?.content || '';
  }

  // Format date
  function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  const filteredPosts = blogs.filter((post) => {
    const matchesCategory =
      activeCategory === 'all' || post.category?.slug === activeCategory;
    const title = post.title || '';
    const desc = getFirstParagraph(post.content);
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section ref={sectionRef} className="bg-white pt-4 sm:pt-6 md:pt-8 pb-8 sm:pb-12 md:pb-16 px-3 sm:px-4 md:px-5 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Filters and Search Row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8 md:mb-10">
          {/* Category Filters */}
          <div ref={filtersRef} className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeCategory === cat.id
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={activeCategory === cat.id ? { backgroundColor: '#C83C64' } : {}}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div ref={searchRef} className="relative w-full md:w-72 md:flex-shrink-0" style={{ opacity: 0 }}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-400 transition-colors"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 animate-pulse"
              >
                <div className="h-48 bg-gray-200" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-5/6" />
                  <div className="h-3 bg-gray-200 rounded w-1/3 mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog Cards Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" style={{ perspective: '1000px' }}>
            {filteredPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group"
                ref={el => cardRefs.current[index] = el}
                style={{ opacity: 0 }}
              >
                <article className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl hover:border-[#C83C64]/20 transition-all duration-400 h-full flex flex-col hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image_url}
                      alt={post.image_alt || post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Category Badge */}
                    {post.category && (
                      <span
                        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium"
                        style={{ backgroundColor: '#ffffff', color: '#C83C64', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
                      >
                        {post.category.name}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-lato font-bold text-gray-800 text-base mb-2 line-clamp-2 group-hover:text-[#C83C64] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                      {getFirstParagraph(post.content)}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-gray-400 text-xs">
                        {formatDate(post.created_at)}
                      </span>
                      <span
                        className="inline-flex items-center gap-1 text-sm font-medium transition-all hover:opacity-80 group-hover:gap-2"
                        style={{ color: '#C83C64' }}
                      >
                        Read More
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
