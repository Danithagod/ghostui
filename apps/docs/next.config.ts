import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['ghostui-react'],
  reactStrictMode: true, // This can help with HMR
};

export default nextConfig;
