import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === 'production' ? '.next-build' : '.next',
  allowedDevOrigins: ['192.168.1.34', '192.168.1.35', '192.168.1.37', 'localhost:3000', 'localhost:3001'],
  outputFileTracingRoot: path.join(__dirname),
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
    ],
  },
};

export default nextConfig;
