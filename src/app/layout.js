import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/QueryProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "sonner";
import { SITE_URL } from "@/lib/site";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luxume Roofing - Premium Steel Roofing Solutions",
    template: "%s | Luxume Roofing",
  },
  description: "Discover the perfect steel solution for every design. Premium quality roofing that combines durability, aesthetics, and innovation.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lato.variable} antialiased`}>
        <QueryProvider>
          <Navbar />
          <div className="relative z-10">
            {children}
            <Footer />
          </div>
          <WhatsAppButton />
          <Toaster
            position="top-right"
            richColors={false}
            toastOptions={{
              style: {
                background: '#1a1a2e',
                color: '#ffffff',
                border: '1px solid #C83C64',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}

