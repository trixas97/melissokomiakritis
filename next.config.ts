import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withPayload } from "@payloadcms/next/withPayload";

// Uploaded media is served from R2 in production. The image allow-list is fixed
// at build time, so the Docker build receives S3_PUBLIC_URL as a build arg.
const mediaHost = process.env.S3_PUBLIC_URL ? [new URL(`${process.env.S3_PUBLIC_URL}/**`)] : [];

const nextConfig: NextConfig = {
  // Required by the Dockerfile, which copies .next/standalone
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      ...mediaHost,
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withPayload(withNextIntl(nextConfig));
