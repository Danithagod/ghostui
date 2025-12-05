import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['ghostui-react'],
  reactStrictMode: true,
  output: 'standalone',
};

export default nextConfig;
