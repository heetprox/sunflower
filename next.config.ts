import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  
  async rewrites() {
    return [
      {
        source: '/api/auth/:path*',
        destination: 'https://sunflower-backend-vv4o.onrender.com/api/auth/:path*',
      },
    ];
  },
  
  // ✅ Add this to help debug
  async headers() {
    return [
      {
        source: '/api/auth/:path*',
        headers: [
          {
            key: 'x-forwarded-host',
            value: 'sunflower.realblue.lol',
          },
        ],
      },
    ];
  },
};

export default nextConfig;