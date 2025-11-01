/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

// Security headers (baseline CSP and hardening)
export async function headers() {
  const csp = [
    "default-src 'self'",
    // Allow images and media from self and data/blob URIs
    "img-src 'self' data: blob:",
    "media-src 'self'",
    // Allow styles; inline is often required by fonts/Next
    "style-src 'self' 'unsafe-inline'",
    // Scripts: self + inline to support inline structured data; adjust if adding nonces
    "script-src 'self' 'unsafe-inline'",
    // Fonts
    "font-src 'self' data:",
    // XHR/web APIs: self + required analytics/monitoring + external APIs used
    "connect-src 'self' https://api.github.com https://api.spotify.com https://accounts.spotify.com https://vitals.vercel-insights.com",
    // Framing protection handled by X-Frame-Options below
  ].join('; ');

  return [
    {
      source: "/:path*",
      headers: [
        { key: "Content-Security-Policy", value: csp },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        // 6 months HSTS; enable preload if domain is ready
        { key: "Strict-Transport-Security", value: "max-age=15552000; includeSubDomains" },
      ],
    },
  ];
}
