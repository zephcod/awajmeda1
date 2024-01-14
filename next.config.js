/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol:"https",
          hostname:"pbs.twimg.com",
          port:''
        },
        {
          protocol:"https",
          hostname:"uploadthing.com",
          port:''
        },
        {
          protocol:"https",
          hostname:"cloud.appwrite.io",
          port:''
        },
      ],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
       ignoreDuringBuilds: true,
    },
  }

module.exports = nextConfig
