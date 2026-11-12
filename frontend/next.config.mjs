// Foto barang datang dari backend (folder uploads) atau dari Cloudinary.
// Host backend diambil dari NEXT_PUBLIC_API_URL supaya ikut berubah saat deploy.
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api");

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", ""),
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/uploads/**",
      },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
