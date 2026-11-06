import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // LAST a été fusionné dans l'étude de cas Learning Academy
  async redirects() {
    return [{ source: "/projets/last", destination: "/projets/learning-academy", permanent: true }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Ajoutez d'autres domaines si besoin :
      // { protocol: 'https', hostname: 'avatars.githubusercontent.com', pathname: '/**' },
    ],
  },
};

export default nextConfig;
