// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: ['plus.unsplash.com', 'www.dropbox.com',"img.clerk.com",'res.cloudinary.com'], // Add both domains here
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['plus.unsplash.com', 'www.dropbox.com', "img.clerk.com", 'res.cloudinary.com'],
  },
  // Add these Prisma-specific configurations:
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@prisma/client');
    }
    return config;
  },
  // Optional: If you're using Prisma with Edge Functions
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  }
};

export default nextConfig;