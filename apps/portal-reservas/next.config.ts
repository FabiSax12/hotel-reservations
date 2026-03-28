import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@hotel/ui", "@hotel/db", "@hotel/core"],
};

export default nextConfig;
