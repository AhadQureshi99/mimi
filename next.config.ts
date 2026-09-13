import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* There's an unrelated lockfile higher up the drive; without this, Next
     infers the wrong workspace root and traces the wrong files. */
  outputFileTracingRoot: path.join(__dirname),

  images: {
    /* Modern formats first — AVIF is typically 30–50% smaller than JPEG at
       the same perceptual quality, which matters most on mobile data. */
    formats: ["image/avif", "image/webp"],
    /* Widths tuned for the phone sizes this is built for, at 1x–3x. */
    deviceSizes: [390, 430, 640, 828, 1080, 1290],
    imageSizes: [96, 160, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  /* Powered-by header is noise on a page that should ship as little as possible. */
  poweredByHeader: false,

  /* The dev overlay badge sits exactly where the music button lives. */
  devIndicators: false,
};

export default nextConfig;
