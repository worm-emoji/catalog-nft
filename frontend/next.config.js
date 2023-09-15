/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { domains: ['luke.cat', 'blotcdn.com', 'blot.im', 'cdn.blot.im'] },
  experimental: { images: { allowFutureImage: true } },
}

module.exports = nextConfig
