import { Lato } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/QueryProvider";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Toaster } from "sonner";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { getQueryClient, prefetch } from "@/lib/queryClient.server";
import { careersQuery, generalSettingsQuery, productsQuery } from "@/lib/queries";
import { buildMediaAltMap } from "@/lib/pageSeo";
import { getMediaAlts } from "@/services/supabase";
import AltTextProvider from "@/providers/AltTextProvider";

// Supabase-backed content is regenerated hourly rather than pinned at build.
export const revalidate = 10;

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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Pages that set their own openGraph replace this whole object, so they must
  // include DEFAULT_OG_IMAGE as their fallback image too.
  openGraph: {
    type: "website",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default async function RootLayout({ children }) {
  // Navbar and Footer render the dashboard's header/footer settings and may
  // list products or open jobs, so prefetching here makes them server-rendered
  // on every page rather than appearing only after hydration.
  const [queryClient, { data: mediaAlts }] = await Promise.all([
    prefetch(getQueryClient(), [generalSettingsQuery(), productsQuery(), careersQuery()]),
    // Alt text set per file in the dashboard Media Library, used site-wide
    getMediaAlts(),
  ]);

  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="9E6_EDefXtqvMGK0C33NycdnvkMmKxjQTkaFXRyzM2Q"
        />
        {/* Google Tag Manager. next/script rather than a raw <script>: React 19
            warns about (and never runs) script tags it renders on the client. */}
        <Script id="gtm-main" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NFCF6BXG');`}
        </Script>
        {/* End Google Tag Manager */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </head>
      {/* Browser extensions (e.g. ColorZilla) add attributes to <body> before React loads */}
      <body className={`${lato.variable} antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NFCF6BXG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <AltTextProvider alts={buildMediaAltMap(mediaAlts)}>
              <Navbar />
              <div className="relative z-10">
                {children}
                <Footer />
              </div>
            </AltTextProvider>
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

