import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  experimental: {
    serverActions: {
      allowedOrigins: ["falahub.noratech.com.br", "localhost:3000"],
    },
  },
};

export default nextConfig;
