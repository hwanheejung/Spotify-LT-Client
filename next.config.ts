import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    API_HOST: process.env.NEXT_PUBLIC_API_HOST,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

export default nextConfig
