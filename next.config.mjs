// Content-Security-Policy scoped to what the app actually loads: Supabase
// (data + realtime), YouTube embeds, Google Tag Manager / GA4, and Next's own
// inline hydration payload. Tags added inside the GTM container that call other
// hosts need those hosts added here too.
// 'unsafe-inline'/'unsafe-eval' on script-src are required by Next's inlined
// bootstrap; tightening those needs a nonce-based setup via middleware.
const isProd = process.env.NODE_ENV === 'production';

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://s.ytimg.com https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com https://i.ytimg.com https://*.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://www.googletagmanager.com",
  "media-src 'self' https://*.supabase.co",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Only force HTTPS in production: in dev the site is served over plain HTTP
  // (e.g. http://192.168.1.60:3000 on the LAN), and upgrading /_next assets to
  // https:// makes every CSS/JS request fail.
  ...(isProd ? ['upgrade-insecure-requests'] : []),
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  ...(isProd
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow loading dev assets / HMR when the dev server is opened via LAN IP.
  allowedDevOrigins: ['192.168.1.60', '192.168.1.*'],
  reactCompiler: true,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xedywkznzgiqvdifknmy.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  // Dashboard media is served from the site's own domain and proxied to the
  // Supabase bucket: www.luxume.in/blog/a.jpg -> bucket blogs/blog-page/a.jpg,
  // anything else keeps its bucket path (www.luxume.in/home-page/hero/a.jpg).
  // afterFiles: /public files and static routes are matched first, and only
  // paths ending in a media extension are proxied, so page routes never are
  // (afterFiles also runs before dynamic routes like /blog/[slug]).
  // See src/lib/storageUrl.js, which rewrites the URLs in database responses.
  async rewrites() {
    const bucket = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog-images`;
    const media = '\\.(?:jpe?g|png|webp|gif|svg|avif|bmp|ico|pdf|mp4|webm|mov|JPE?G|PNG|WEBP|GIF|SVG|AVIF|PDF|MP4)';
    return {
      afterFiles: [
        {
          source: `/blog/:file([^/]+${media})`,
          destination: `${bucket}/blogs/blog-page/:file`,
        },
        {
          source: `/:path(.*${media})`,
          destination: `${bucket}/:path`,
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
