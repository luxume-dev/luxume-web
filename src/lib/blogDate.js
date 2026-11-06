/**
 * The date shown for a blog post: published_on when set, otherwise created_at.
 * published_on is a plain date (YYYY-MM-DD); it gets a local midnight time so
 * `new Date()` doesn't read it as UTC and show the previous day.
 *
 * @param {{published_on?: string|null, created_at?: string|null}} post
 * @returns {string} a date string for `new Date()`, or '' when there is none
 */
export function blogDate(post) {
  if (post?.published_on) return `${post.published_on}T00:00:00`;
  return post?.created_at || '';
}
