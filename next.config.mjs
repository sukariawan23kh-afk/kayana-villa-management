/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: Do NOT use `output: "standalone"` on Netlify.
  // The @netlify/plugin-nextjs handles the build output itself.
  // (`output: standalone` is only useful for self-hosted Node servers / Docker.)

  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "z-cdn.chatglm.cn",
      },
    ],
  },
  allowedDevOrigins: ["*.space-z.ai"],
};

export default nextConfig;
