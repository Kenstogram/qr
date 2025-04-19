/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  reactStrictMode: false,
  images: {
    domains: [
      "public.blob.vercel-storage.com",
      "res.cloudinary.com",
      "abs.twimg.com",
      "pbs.twimg.com",
      "avatars.githubusercontent.com",
      "www.google.com",
      "flag.vercel.app",
      "illustrations.popsy.co",
      "qrexperiences.com",
      "app.qrexperiences.com",
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      net: false,
      dgram: false,
      dns: false,
      tls: false,
      child_process: false,
    };
    return config;
  },
};

module.exports = nextConfig;
