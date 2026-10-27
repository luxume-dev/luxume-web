import { Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/QueryProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "sonner";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { SITE_URL } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { getQueryClient, prefetch } from "@/lib/queryClient.server";
import { productsQuery } from "@/lib/queries";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

// Supabase-backed content is regenerated hourly rather than pinned at build.
export const revalidate = 3600;

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

export default async function RootLayout({ children }) {
  // Navbar and Footer both render the product list, so prefetching here makes
  // those links server-rendered on every page rather than appearing only after
  // hydration.
  const queryClient = await prefetch(getQueryClient(), [productsQuery()]);

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
      </head>
      <body className={`${lato.variable} antialiased`}>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Navbar />
            <div className="relative z-10">
              {children}
              <Footer />
            </div>
          </HydrationBoundary>
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

