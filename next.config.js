/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["picsum.photos", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
