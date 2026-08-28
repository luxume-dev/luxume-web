import ProductsIntro from '@/components/ProductsIntro';
import ProductStats from '@/components/ProductStats';
import ProductGrid from '@/components/ProductGrid';
import ProductHero from '@/components/ProductHero';

export const metadata = {
  title: 'Steel Roofing Products',
  description:
    'Browse the full Luxume range of coated steel roofing profiles and finishes — engineered for weather resistance, colour retention, and long service life.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div> {/* Add padding to account for absolute navbar */}
        <ProductHero 
          heading="Innovative Roofing Materials & Designs"
          backgroundImage="/images/product-hero.webp"
        />
        <ProductsIntro />
        <ProductStats />
        <ProductGrid />
      </div>
    </main>
  );
}
