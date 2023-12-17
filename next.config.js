/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "groww.in",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
