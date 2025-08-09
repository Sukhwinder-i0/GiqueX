import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'], // Allow Google profile pictures
  },
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  distDir: '.next',
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  experimental: {
  }
};

export default nextConfig;
