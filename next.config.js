/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['shiba-nft.infura-ipfs.io'],
    formats: ['image/webp'],
  }
}

module.exports = nextConfig;
