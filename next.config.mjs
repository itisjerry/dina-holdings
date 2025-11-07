/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/Privacy', destination: '/privacy', permanent: true },
    ];
  },
};
module.exports = nextConfig;
