import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { blogQuery } from '@/lib/queries';
import BlogDetailClient from '@/components/blog/BlogDetailClient';

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
 * would inherit the site-wide default — five identical descriptions. Prefer a
 * real meta_description whenever an author supplies one.
 */
function deriveDescription(content, limit = 155) {
  if (!Array.isArray(content)) return undefined;

  const text = content
    .filter((block) => block?.type === 'paragraph' && typeof block.content === 'string')
    .map((block) => block.content.trim())
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return undefined;
  if (text.length <= limit) return text;

  const clipped = text.slice(0, limit);
  const lastSpace = clipped.lastIndexOf(' ');
  return `${clipped.slice(0, lastSpace > 0 ? lastSpace : limit).replace(/[,;:.]$/, '')}…`;
}

/**
 * Replaces the previous document.title/meta injection that ran in a client
 * useEffect — those tags existed only after hydration, so crawlers and social
 * unfurlers never saw them. The Supabase columns are the same ones.
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Blog', alternates: { canonical: `/blog/${slug}` } };
  }

  const title = post.meta_title || post.title;
  const description = post.meta_description || deriveDescription(post.content);

  return {
    title,
    ...(description ? { description } : {}),
    ...(post.meta_keywords?.length ? { keywords: post.meta_keywords } : {}),
    // Honour an explicit canonical_url from the CMS, else self-reference.
    alternates: { canonical: post.canonical_url || `/blog/${slug}` },
    openGraph: {
      title,
      ...(description ? { description } : {}),
      type: 'article',
      url: `/blog/${slug}`,
      ...(post.created_at ? { publishedTime: post.created_at } : {}),
      ...(post.image_url ? { images: [post.image_url] } : {}),
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const queryClient = await prefetch(getQueryClient(), [blogQuery(slug)]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogDetailClient />
    </HydrationBoundary>
  );
}
