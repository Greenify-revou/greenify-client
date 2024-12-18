import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.ibb.co", 
      "i.ibb.co.com",       // Correct domain for ibb.co
      "media.giphy.com", // Giphy for gifs
      "giphy.com",       // General Giphy domain
      "via.placeholder.com" // Placeholder images
    ],
  },
};

export default nextConfig;
