import { permanentRedirect } from 'next/navigation';

// Category pages live at the top level now (/aluminium-zinc-coated-steel, served by
// src/app/[location]/page.js). Old /product-category/<slug> links redirect there.
export default async function ProductCategoryRedirect({ params }) {
  const { category } = await params;
  permanentRedirect(`/${encodeURIComponent(category)}`);
}
