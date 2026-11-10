// TEMP (review): keep the whole location module out of search engines while it
// is being reviewed. Applies to /locations (the city pages /[location] have their own layout). Delete this file to make it indexable again,
// and restore the location entries in src/app/sitemap.js.
export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function LocationsLayout({ children }) {
  return children;
}
