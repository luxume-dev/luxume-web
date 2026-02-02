import ProductsIntro from '@/components/ProductsIntro';
import ProductStats from '@/components/ProductStats';
import ProductGrid from '@/components/ProductGrid';
import ProductHero from '@/components/ProductHero';

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
