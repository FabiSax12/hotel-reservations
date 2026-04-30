import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@hotel/ui", "@hotel/db", "@hotel/core"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
};

export default nextConfig;
