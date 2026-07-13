import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME-type sniffing of responses.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Disallow embedding the site in iframes (clickjacking).
          { key: "X-Frame-Options", value: "DENY" },
          // Only send the origin as referrer to other sites.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // This site never needs these browser capabilities.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
