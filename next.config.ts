import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    // 在服务器端渲染时允许使用环境变量
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  env: {
    // 确保环境变量在构建时和运行时都可用
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
}

export default nextConfig
