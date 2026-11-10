// TEMP (review): keep location pages (/ernakulam, /kottayam, ...) out of search engines while
// the location module is being reviewed. Delete this file (and src/app/locations/layout.js) to make
// them indexable again, and restore the location entries in src/app/sitemap.js.
export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function LocationLayout({ children }) {
  return children;
}
