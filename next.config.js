/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js', 'api.js', 'api.ts'],
  images: {
    domains: [],
    loader: 'akamai',
    path: '/',
  },
  swcMinify: true,
}

module.exports = nextConfig
