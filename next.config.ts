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
};

export default nextConfig;