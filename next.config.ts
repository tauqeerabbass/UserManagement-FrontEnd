import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "http://localhost:3000/uploads/:path*",
      },
    ];
  },
  images: {
    domains: ["localhost", "img.freepik.com", "blogs.a-sports.tv"],
  },
};

export default nextConfig;
