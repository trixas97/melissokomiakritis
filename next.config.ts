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
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withPayload(withNextIntl(nextConfig));
