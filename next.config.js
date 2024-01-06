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
    },}

module.exports = nextConfig
