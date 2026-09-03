import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only needed for the hardcoded fallback/sample article thumbnails used when Notion is
    // unconfigured or returns no results — real content images are local files under public/images.
    remotePatterns: [{ protocol: "https", hostname: "www.untitledui.com" }],
  },
};

export default nextConfig;
