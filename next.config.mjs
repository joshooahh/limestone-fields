/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Sanity Studio works properly
  transpilePackages: ['next-sanity'],
  images: {
    // Allow using Figma-hosted MCP assets in next/image
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'www.figma.com',
        pathname: '/api/mcp/asset/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/buyouts', destination: '/private-events', permanent: true },
    ]
  },
}

export default nextConfig;
