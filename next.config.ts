import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { hostname: "utfs.io" },
      { hostname: "26ayps101t.ufs.sh" },
    ],
  },
};

export default nextConfig;
