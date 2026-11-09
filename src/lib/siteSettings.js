/**
 * Site-wide header / footer settings ("general-settings" table, edited in the
 * dashboard under Settings → General Settings).
 *
 * Only the saved content is used: there are no defaults. Empty fields (or a
 * missing row) are simply not shown.
 */

const isRecord = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);

/** Settings row → { header, footer, footerBottom }, exactly as saved ({} when missing). */
export function resolveSiteSettings(row) {
  return {
    header: isRecord(row?.header) ? row.header : {},
    footer: isRecord(row?.footer) ? row.footer : {},
    footerBottom: isRecord(row?.footer_bottom) ? row.footer_bottom : {},
  };
}

/** Links to another site (or mail/phone) are plain <a>; site pages use next/link. */
export function isExternalHref(href) {
  return /^(https?:)?\/\//i.test(href || '') || /^(mailto|tel|sms|whatsapp):/i.test(href || '');
}

/** Opens in a new tab: only real web links to other sites. */
export function opensNewTab(href) {
  return /^(https?:)?\/\//i.test(href || '');
}

/** Social icon value → link. Phone / WhatsApp / email may be typed as a plain number or address. */
export function socialHref(platform, value) {
  const v = String(value || '').trim();
  if (!v) return '';
  if (/^[a-z]+:/i.test(v) || v.startsWith('//')) return v;
  const digits = v.replace(/[^\d+]/g, '');
  if (platform === 'phone') return `tel:${digits}`;
  if (platform === 'whatsapp') return `https://wa.me/${digits.replace(/\+/g, '')}`;
  if (platform === 'email') return `mailto:${v}`;
  return /^www\./i.test(v) || v.includes('.') ? `https://${v}` : v;
}

/** Whether `pathname` is on the page `href` points to (or below it). */
export function isActivePath(pathname, href) {
  if (!href || isExternalHref(href)) return false;
  const path = href.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  if (path === '/') return pathname === '/';
  return pathname === path || pathname.startsWith(path + '/');
}

/**
 * The links of a menu dropdown or footer column.
 * source: custom (its own links) | products | careers
 */
export function resolveLinks(source, customLinks, { products, careers }) {
  if (source === 'products') {
    return (products || []).map((p) => ({ key: p.id ?? p.slug, label: p.title ?? p.name, href: `/products/${p.slug}` }));
  }
  if (source === 'careers') {
    return (careers || []).map((c) => ({ key: c.id, label: c.title, href: `/careers/${c.id}` }));
  }
  return (Array.isArray(customLinks) ? customLinks : [])
    .filter((l) => l && l.label && l.href)
    .map((l, i) => ({ key: `${i}-${l.href}`, label: l.label, href: l.href }));
}
