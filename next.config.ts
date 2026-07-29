import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Keystatic's reader reads content files from disk. Routes that read at
  // request time (not just build) must bundle those files into their Vercel
  // serverless function, or the reads 404 in production.
  outputFileTracingIncludes: {
    "/api/chat": ["./src/content/**/*"],
    "/work/[slug]": ["./src/content/**/*"],
    "/blog/[slug]": ["./src/content/**/*"],
  },
};

export default nextConfig;
