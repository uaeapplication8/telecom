import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Yeh line Next.js ko static checks chalane se rokegi
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};

export default nextConfig;