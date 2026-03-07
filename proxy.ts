import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

function buildContentSecurityPolicy(nonce: string): string {
  const isDev = process.env.NODE_ENV !== "production";
  const scriptSrc = [
    "'self'",
    `'nonce-${nonce}'`,
    "'strict-dynamic'",
    ...(isDev ? ["'unsafe-eval'"] : []),
  ].join(" ");

  // Keep style-src nonce-first. `unsafe-inline` is retained as a compatibility fallback
  // for framework/runtime-generated style tags that may not receive nonce in all contexts.
  const styleSrc = ["'self'", `'nonce-${nonce}'`, "'unsafe-inline'"].join(" ");

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    `script-src ${scriptSrc}`,
    `style-src ${styleSrc}`,
    "img-src 'self' data: blob: https://*.scdn.co https://*.spotifycdn.com",
    "font-src 'self' data:",
    "media-src 'self'",
    "connect-src 'self' https://api.github.com https://api.spotify.com https://accounts.spotify.com https://vitals.vercel-insights.com https://github-contributions-api.jogruber.de",
    "upgrade-insecure-requests",
  ].join("; ");
}

export function proxy(request: NextRequest) {
  const nonce = crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", buildContentSecurityPolicy(nonce));

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("Content-Security-Policy", buildContentSecurityPolicy(nonce));
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(self)");
  response.headers.set("Strict-Transport-Security", "max-age=15552000; includeSubDomains");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
