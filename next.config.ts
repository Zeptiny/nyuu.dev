import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The root layout is app/[lang], so an unmatched address needs a 404 page of its own.
    globalNotFound: true,
  },
  // English is served at the root and the other languages under their code (src/i18n/languages.ts),
  // while every language renders from app/[lang].
  async rewrites() {
    return [{ source: "/", destination: "/en" }];
  },
  async redirects() {
    return [{ source: "/en", destination: "/", permanent: true }];
  },
};

export default nextConfig;

// Added by create-cloudflare so `getCloudflareContext()` works in `next dev`.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
