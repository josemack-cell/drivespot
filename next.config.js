/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/drivecommerce/:path*',
        // If you’re still using our internal API routes under Next.js, you can remove this whole rewrite.
        // Otherwise, point it to your external API, e.g.:
        // destination: 'http://localhost:5000/api/drivecommerce/:path*',
        
        // **If you're using Next.js API routes under src/app/api, you don't need a rewrite at all.**
        
        // So for now, you can either:
        // 1️⃣ Delete or comment out this entry
        // 2️⃣ Or point it to a real service:
        destination: 'http://localhost:5000/api/drivecommerce/:path*',
      },
    ]
  },
}

module.exports = nextConfig
