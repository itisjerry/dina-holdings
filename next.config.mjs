/** @type {import('next').NextConfig} */
const nextConfig = {
  // optional: keep your settings here
  experimental: {},
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
  },
  async redirects() {
    return [
      // safety: if anyone hits /Privacy, send to lowercase route
      { source: '/Privacy', destination: '/privacy', permanent: true },
    ];
  },
};

export default nextConfig;
