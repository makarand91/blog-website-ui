/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'dai-cms-strapi2.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'dai-cms-strapi2.s3.amazonaws.com',
      },
    ],
  },
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
