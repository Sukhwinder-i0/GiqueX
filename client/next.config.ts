import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  // Add these configurations
  distDir: '.next',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  experimental: {
  }
};

export default nextConfig;
