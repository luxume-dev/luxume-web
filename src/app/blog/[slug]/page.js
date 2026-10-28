import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient, prefetch } from '@/lib/queryClient.server';
import { blogQuery } from '@/lib/queries';
import { postMissing } from '@/lib/exists.server';
import { summarise } from '@/lib/text';
import { DEFAULT_OG_IMAGE } from '@/lib/site';
import { blogPostingSchema, breadcrumbSchema } from '@/lib/schema';
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
 * would inherit the site-wide default — five identical descriptions.
 */
function deriveDescription(content) {
  if (!Array.isArray(content)) return undefined;

  const text = content
    .filter((block) => block?.type === 'paragraph' && typeof block.content === 'string')
    .map((block) => block.content)
    .join(' ');

  return summarise(text);
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
  const description = summarise(post.meta_description) || deriveDescription(post.content);

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
      images: [post.image_url || DEFAULT_OG_IMAGE],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;

  // Serve a real 404 for records that do not exist, instead of a 200
  // shell that search engines would treat as a soft 404.
  if (await postMissing(slug)) notFound();

  const queryClient = await prefetch(getQueryClient(), [blogQuery(slug)]);

  const post = queryClient.getQueryData(blogQuery(slug).queryKey);
  const article = blogPostingSchema(post, slug);
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Blog', path: '/blog' },
    { name: post?.title ?? 'Article', path: `/blog/${slug}` },
  ]);

  return (
    <>
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
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BlogDetailClient />
      </HydrationBoundary>
    </>
  );
}
