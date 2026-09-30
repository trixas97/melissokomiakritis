import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

// Uploaded media is served from each environment's R2 bucket. The image
// allow-list is fixed at build time, but one image is promoted from UAT to
// production (different buckets), so allow every r2.dev public bucket URL.
// If a bucket gets a custom domain, add that host here.
const nextConfig: NextConfig = {
  // Required by the Dockerfile, which copies .next/standalone
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.r2.dev" }],
  },
  // Files the server needs that output tracing misses (key merged with Payload's):
  // - sharp's native Linux binaries: tracing copies sharp's JS but not libvips'
  //   .so files, so Payload crashes at startup with "Could not load the sharp
  //   module" on Vercel. (The Dockerfile copies node_modules/@img itself.)
  // - the /public files the first-boot seed uploads to Media; Vercel serves
  //   /public from its CDN and leaves it out of the functions.
  outputFileTracingIncludes: {
    "**/*": [
      "./node_modules/@img/sharp-linux-x64/**/*",
      "./node_modules/@img/sharp-libvips-linux-x64/**/*",
      "./public/logo.png",
      "./public/logo-light.png",
      "./public/bee-animation.mp4",
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withPayload(withNextIntl(nextConfig));
