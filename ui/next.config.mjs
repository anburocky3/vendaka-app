import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const proxyUrl = process.env.PROXY_URL || "http://localhost:5000";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: __dirname,
  },
  experimental: {
    proxyClientMaxBodySize: 20 * 1024 * 1024, // 20MB
  },
  async rewrites() {
    return {
      afterFiles: [
        {
          source: "/api/:path*",
          destination: `${proxyUrl}/:path*`, // Proxy to Backend
        },
      ],
    };
  },
};

export default nextConfig;
