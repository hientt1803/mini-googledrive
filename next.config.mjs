/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "grandiose-spaniel-545.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
