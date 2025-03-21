import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "", 
        pathname: "/**", 
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net", // Añadir Contentful
        port: "", 
        pathname: "/**", 
      },
    ],
  },
};

export default nextConfig;