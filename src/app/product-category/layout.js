// TEMP (review): keep product category pages (/product-category, /product-category/...) out of
// search engines while the module is being reviewed. Delete this file to make them indexable again
// (and add them to src/app/sitemap.js). Location × category pages (/ernakulam/gi-sheets) are
// already noindex via src/app/[location]/layout.js.
export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ProductCategoryLayout({ children }) {
  return children;
}
