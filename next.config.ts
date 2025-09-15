/* eslint-disable */
import type { NextConfig } from "next";

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = withPWA({
  eslint: {
    dirs: ["src"],
    ignoreDuringBuilds: true,
  },
  // standalone output for Docker
  // output: 'standalone',
  typedRoutes: true,
  images: {
    remotePatterns: [],
  },
});

export default nextConfig;
