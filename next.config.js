/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // used to restore to same scroll position when user clicks back
    scrollRestoration: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org", "i.ytimg.com"],
  },
};

module.exports = nextConfig;
