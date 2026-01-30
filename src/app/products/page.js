import Navbar from '@/components/Navbar';
import ProductsIntro from '@/components/ProductsIntro';
import ProductStats from '@/components/ProductStats';
import Footer from '@/components/Footer';

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mt-20"> {/* Add padding to account for absolute navbar */}
        <ProductsIntro />
        <ProductStats />
      </div>
    </main>
  );
}
