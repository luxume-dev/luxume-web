'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useBlog } from '@/hooks/useBlogs';


/* ─── Recursive Content Block Renderer ─────────────────────────────── */

/**
 * Resolves the actual list items for a list block.
 * Handles edge case where items have empty text and the real content
 * is stored in block.content as newline-separated lines.
 */
function resolveListItems(block) {
  const items = block.items || [];
  const hasValidItems = items.some((item) => item.text && item.text.trim() !== '');

  if (hasValidItems) return items;

  // Fallback: split block.content by newlines into individual items
  if (block.content && block.content.trim()) {
    return block.content
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line, idx) => ({
        id: `${block.id}-fallback-${idx}`,
        text: line.trim(),
      }));
  }

  return items;
}

function ContentBlockRenderer({ block }) {
  if (!block) return null;

  switch (block.type) {
    case 'heading':
      return (
        <h2 className="font-lato font-bold text-gray-900 text-xl sm:text-2xl mt-8 mb-4">
          {block.content}
        </h2>
      );

    case 'paragraph':
      return (
        <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
          {block.content}
        </p>
      );

    case 'bullets': {
      const listItems = resolveListItems(block);
      return (
        <ul className="pl-6 mb-4 space-y-2" style={{ listStyleType: 'disc' }}>
          {listItems.map((item) => (
            <li key={item.id} className="text-gray-600 text-sm sm:text-base leading-relaxed" style={{ display: 'list-item' }}>
              {item.text}
              {item.children && item.children.length > 0 && (
                <div className="mt-2">
                  {item.children.map((child) => (
                    <ContentBlockRenderer key={child.id} block={child} />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      );
    }

    case 'numbered_list': {
      const listItems = resolveListItems(block);
      return (
        <ol className="pl-6 mb-4 space-y-2" style={{ listStyleType: 'decimal' }}>
          {listItems.map((item) => (
            <li key={item.id} className="text-gray-600 text-sm sm:text-base leading-relaxed" style={{ display: 'list-item' }}>
              <span className="font-medium text-gray-700">{item.text}</span>
              {item.children && item.children.length > 0 && (
                <div className="mt-2">
                  {item.children.map((child) => (
                    <ContentBlockRenderer key={child.id} block={child} />
                  ))}
                </div>
              )}
            </li>
          ))}
        </ol>
      );
    }

    default:
      return null;
  }
}

/* ─── Blog Detail Page ─────────────────────────────────────────────── */

export default function BlogDetailClient() {
  const { slug } = useParams();
  const { data: blog, isLoading: loading } = useBlog(slug);

  // SEO head tags are produced server-side by generateMetadata in
  // src/app/blog/[slug]/page.js. The previous client-side document.title /
  // meta injection ran only after hydration (invisible to crawlers) and its
  // cleanup removed the canonical tag on unmount.

  /* ─── Format date ───────────────────────────────────────────────── */
  function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  /* ─── Loading State ─────────────────────────────────────────────── */
  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        {/* Hero Skeleton */}
        <div className="w-full h-[350px] sm:h-[420px] bg-gray-200 animate-pulse" />
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse mt-8" />
          <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
        </div>
      </main>
    );
  }

  /* ─── Not Found ─────────────────────────────────────────────────── */
  if (!blog) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
        <h1 className="font-aloevera font-bold text-3xl text-gray-800 mb-4">
          Blog Not Found
        </h1>
        <p className="text-gray-500 mb-8">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/blog"
          className="px-6 py-3 rounded-full text-white font-medium transition-all duration-300 hover:opacity-90"
          style={{ backgroundColor: '#C83C64' }}
        >
          Back to Blog
        </Link>
      </main>
    );
  }

  /* ─── Blog Detail ───────────────────────────────────────────────── */
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative">
        <div
          className="w-full h-[350px] sm:h-[420px] md:h-[480px] bg-cover bg-center bg-no-repeat overflow-hidden relative"
          style={{
            backgroundImage: `url(${blog.image_url})`,
          }}
        >
          {/* Dark gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-8 md:px-16 lg:px-24 pb-10 md:pb-14 max-w-6xl mx-auto">
            {/* Category Badge */}
            {blog.category && (
              <span
                className="inline-block px-4 py-1.5 rounded-full text-xs font-medium text-white mb-4 w-fit"
                style={{ backgroundColor: '#C83C64' }}
              >
                {blog.category.name}
              </span>
            )}

            <h1 className="font-lato font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4 max-w-3xl">
              {blog.title}
            </h1>

            <time className="text-white/70 text-sm">{formatDate(blog.created_at)}</time>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-10 md:py-16 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          {Array.isArray(blog.content) &&
            blog.content.map((block) => (
              <ContentBlockRenderer key={block.id} block={block} />
            ))}
        </div>
      </section>

      {/* Back to Blog */}
      <section className="pb-12 md:pb-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
            style={{ color: '#C83C64' }}
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to all articles
          </Link>
        </div>
      </section>
    </main>
  );
}
