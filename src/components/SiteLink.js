import Link from 'next/link';
import { isExternalHref, opensNewTab } from '@/lib/siteSettings';

/** Link from dashboard settings: next/link for site pages, <a> for other sites, phone and mail. */
export default function SiteLink({ href, children, ...props }) {
  if (isExternalHref(href)) {
    const newTab = opensNewTab(href);
    return (
      <a href={href} target={newTab ? '_blank' : undefined} rel={newTab ? 'noopener noreferrer' : undefined} {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href || '/'} {...props}>
      {children}
    </Link>
  );
}
