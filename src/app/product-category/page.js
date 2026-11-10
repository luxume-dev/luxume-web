import LocationHero from '@/components/locations/LocationHero';
import { ProductCategoryCard } from '@/components/productCategories/ProductCategoryDetail';
import { breadcrumbSchema } from '@/lib/schema';
import { jsonLd } from '@/lib/pageSeo';
import { productCategories } from '@/data/productCategories';

export const metadata = {
  title: 'Roofing Sheet Categories',
  description:
    'Explore metal roofing, steel roofing, colour-coated, galvanised, Galvalume, PPGL, GI and cladding sheets from Luxume.',
  alternates: { canonical: '/product-category' },
};

export default function ProductCategoryPage() {
  const breadcrumbs = breadcrumbSchema([
    { name: 'Home', path: '' },
    { name: 'Product Category', path: '/product-category' },
  ]);

  return (
    <main className="min-h-screen bg-white">
      {breadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs) }} />
      )}

      <LocationHero
        image="/images/product-hero.webp"
        eyebrow="Product Category"
        heading="Roofing sheets for every need"
        description="From colour-coated and Galvalume roofing to GI, PPGL and cladding sheets, find the right sheet for your home, factory or commercial project."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Product Category' }]}
      />

      <section className="py-16 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="aloevera-bold text-4xl md:text-[48px] leading-tight mb-4" style={{ color: 'var(--secondary)' }}>
              Browse by category
            </h2>
            <p className="lato-regular text-[16px] max-w-2xl mx-auto leading-[28px]" style={{ color: 'var(--text-description)' }}>
              Every Luxume sheet is engineered for Kerala&rsquo;s rain, sun and coastal air. Pick a category to see features,
              specifications and where to buy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCategories.map((c) => (
              <ProductCategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
