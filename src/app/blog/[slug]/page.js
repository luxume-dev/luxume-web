import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { blogQuery } from '@/lib/queries';
import { postMissing } from '@/lib/exists.server';
import { summarise } from '@/lib/text';
import { firstParagraph, isHtmlContent } from '@/lib/blogContent';
import { DEFAULT_OG_IMAGE } from '@/lib/site';
import { blogPostingSchema, breadcrumbSchema } from '@/lib/schema';
import { getBlogPostSeoCached } from '@/lib/pageSeo.server';
import { buildAltMap, faqPageSchema, jsonLd, visibleFaqs } from '@/lib/pageSeo';
import AltTextProvider from '@/providers/AltTextProvider';
import BlogDetailClient from '@/components/blog/BlogDetailClient';
import FaqSection from '@/components/FaqSection';

export const revalidate = 3600;

async function getPost(slug) {
  try {
    return await blogQuery(slug).queryFn();
  } catch {
    return null;
  }
}

/**
 * Derive a description from the post body.
 *
 * No post currently sets meta_description, and without this every article
 * would inherit the site-wide default — five identical descriptions.
 */
function deriveDescription(content) {
  // HTML from the rich-text editor: start from the first paragraph
  if (isHtmlContent(content)) return summarise(firstParagraph(content)) || undefined;
  if (!Array.isArray(content)) return undefined;

  const text = content
    .filter((block) => block?.type === 'paragraph' && typeof block.content === 'string')
    .map((block) => block.content)
    .join(' ');

  return summarise(text);
}

const clean = (value) => (typeof value === 'string' ? value.trim() : '');

/**
 * SEO is managed per post in the dashboard (blogs.blog_id -> page_seo). Empty
 * page_seo fields fall back to the post's old meta columns, then to the title,
 * the body and the featured image.
 *
 * Replaces the previous document.title/meta injection that ran in a client
 * useEffect — those tags existed only after hydration, so crawlers and social
 * unfurlers never saw them. The Supabase columns are the same ones.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const [post, seo] = await Promise.all([getPost(slug), getBlogPostSeoCached(slug)]);

  if (!post) {
    return { title: 'Blog', alternates: { canonical: `/blog/${slug}` } };
  }

  // A page_seo meta title is the full title, so skip the "| Luxume Roofing" template
  const seoTitle = clean(seo?.meta_title);
  const title = seoTitle ? { absolute: seoTitle } : post.meta_title || post.title;
  const plainTitle = seoTitle || post.meta_title || post.title;
  const description =
    clean(seo?.meta_description) || summarise(post.meta_description) || deriveDescription(post.content);

  const seoKeywords = clean(seo?.meta_keywords)
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
  const keywords = seoKeywords.length ? seoKeywords : post.meta_keywords ?? [];

  const ogTitle = clean(seo?.og_title) || plainTitle;
  const ogDescription = clean(seo?.og_description) || description;
  const ogImage = clean(seo?.og_image) || post.image_url || DEFAULT_OG_IMAGE;
  const url = clean(seo?.og_url) || `/blog/${slug}`;

  return {
    title,
    ...(description ? { description } : {}),
    ...(keywords.length ? { keywords } : {}),
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: ogTitle,
      ...(ogDescription ? { description: ogDescription } : {}),
      type: 'article',
      url,
      ...((post.published_on || post.created_at)
        ? { publishedTime: post.published_on || post.created_at }
        : {}),
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      ...(ogDescription ? { description: ogDescription } : {}),
      images: [ogImage],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  // Serve a real 404 for records that do not exist, instead of a 200
  // shell that search engines would treat as a soft 404.
  if (await postMissing(slug)) notFound();

  const [queryClient, seo] = await Promise.all([
    prefetch(getQueryClient(), [blogQuery(slug)]),
    getBlogPostSeoCached(slug),
  ]);
  const faqs = visibleFaqs(seo);
  const faqSchema = faqPageSchema(faqs);

  const post = queryClient.getQueryData(blogQuery(slug).queryKey);
  const article = blogPostingSchema(post, slug);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Blog', path: '/blog' },
    { name: post?.title ?? 'Article', path: `/blog/${slug}` },
  ]);

  return (
    <AltTextProvider alts={buildAltMap(seo)}>
      {article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
        />
      )}
      {breadcrumbs && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
        />
      )}
      {seo?.schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(seo.schema) }} />
      )}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogDetailClient />
      </HydrationBoundary>
      <FaqSection faqs={faqs} />
    </AltTextProvider>
  );
}
