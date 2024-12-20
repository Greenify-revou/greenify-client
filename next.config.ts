import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.ibb.co",      // For images hosted on ibb.co
      "media.giphy.com", // For images hosted on Giphy
      "giphy.com",     // General Giphy domain
      "via.placeholder.com",
      "ibb.co.com",
      "i.ibb.co.com" // For placeholder images
    ],
  },
};

export default nextConfig;
