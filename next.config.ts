import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  output: 'export',
  transpilePackages: ['three'],
  basePath: isProd ? '/ux-designer-portfolio' : '',
  assetPrefix: isProd ? '/ux-designer-portfolio/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/ux-designer-portfolio' : '',
  },
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.ts',
  },
}

export default nextConfig
