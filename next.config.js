/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      // Safety: redirect old uppercase path to lowercase
      { source: '/Privacy', destination: '/privacy', permanent: true },
    ];
  },
};

module.exports = nextConfig;
