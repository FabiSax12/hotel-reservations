import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@hotel/ui", "@hotel/db", "@hotel/core"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "http", hostname: "127.0.0.1", port: "54321" },
    ],
  },
};

export default nextConfig;
