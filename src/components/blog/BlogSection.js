'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = [
  { id: 'all', label: 'All' },
  { id: 'roofing-sheets', label: 'Roofing Sheets' },
  { id: 'colors-coatings', label: 'Colors & Coatings' },
  { id: 'installation-tips', label: 'Installation Tips' },
  { id: 'industry-insights', label: 'Industry Insights' }
];

const blogPosts = [
  {
    id: 1,
    category: 'roofing-sheets',
    categoryLabel: 'Roofing Sheets',
    title: 'Understanding Modern Steel Roofing Sheet Specifications',
    description: 'Learn about the key specifications to consider when selecting steel roofing sheets for your construction projects. From gauge measurements to coating types, understand what matters.',
    image: '/images/blog1.jpg',
    date: 'Jan 15, 2026'
  },
  {
    id: 2,
    category: 'colors-coatings',
    categoryLabel: 'Colors & Coatings',
    title: 'The Ultimate Guide to Color-Coated Galvalume Sheets',
    description: 'Discover how premium color coated sheets enhance durability and aesthetic appeal of galvalume roofing sheets, protecting your investment for decades.',
    image: '/images/blog2.jpg',
    date: 'Jan 12, 2026'
  },
  {
    id: 3,
    category: 'industry-insights',
    categoryLabel: 'Industry Insights',
    title: 'How Industrial Architecture Is Evolving with Steel Roofing',
    description: 'Explore the transformation of industrial design through innovative steel roofing solutions that combine functionality with modern aesthetics.',
    image: '/images/blog3.jpg',
    date: 'Jan 10, 2026'
  },
  {
    id: 4,
    category: 'installation-tips',
    categoryLabel: 'Installation Tips',
    title: 'Professional Installation Techniques for Metal Roofing',
    description: 'Master the essential techniques and best practices for installing any metal roofing systems to ensure longevity, weather resistance, and optimal performance.',
    image: '/images/blog4.jpg',
    date: 'Jan 8, 2026'
  },
  {
    id: 5,
    category: 'installation-tips',
    categoryLabel: 'Installation Tips',
    title: 'Safety Guidelines for Roofing Construction Projects',
    description: 'Comprehensive safety protocols and guidelines for construction workers installing roofing systems, ensuring workplace safety standards are met.',
    image: '/images/blog5.jpg',
    date: 'Jan 5, 2026'
  },
  {
    id: 6,
    category: 'industry-insights',
    categoryLabel: 'Industry Insights',
    title: 'Warehouse Roofing Solutions: Durability Meets Efficiency',
    description: 'Discover why steel roofing is the preferred choice for warehouse and industrial facilities, offering superior durability and cost-effectiveness.',
    image: '/images/blog6.jpg',
    date: 'Jan 3, 2026'
  }
];

const categoryColors = {
  'roofing-sheets': '#C83C64',
  'colors-coatings': '#C83C64',
  'installation-tips': '#C83C64',
  'industry-insights': '#C83C64'
};

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-white py-12 md:py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Filters and Search Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-gray-400 transition-colors"
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

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {/* Category Badge */}
                <span
                  className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: categoryColors[post.category] || '#C83C64' }}
                >
                  {post.categoryLabel}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-800 text-base mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>
                <Link
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center gap-1 text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: '#C83C64' }}
                >
                  Read More
                  <svg
                    className="w-4 h-4"
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
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No articles found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
