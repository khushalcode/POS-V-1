import type { NextConfig } from "next";

// The Android APK build (Capacitor) needs a static export (`output: "export"`,
// producing ./out with an index.html). The Windows .exe / server build needs
// `output: "standalone"` (producing .next/standalone/server.js).
// The build-apk workflow sets BUILD_MODE=apk to select the right one.
//
// NOTE: `output: "export"` does not support API Route Handlers with
// POST/PUT/DELETE (only static GET). Since this app has ~30 such routes
// under src/app/api, the build-apk workflow temporarily moves that folder
// out of src/app before running `next build` in apk mode, and restores it
// afterwards. The packaged Android/Electron app talks to a local SQLite
// database directly (see src/hooks/use-shop-fetch.ts) rather than through
// these API routes at runtime, so they aren't needed in that build anyway.
const isApkBuild = process.env.BUILD_MODE === "apk";

const nextConfig: NextConfig = {
  output: isApkBuild ? "export" : "standalone",
  images: {
    unoptimized: isApkBuild,
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "127.0.0.1", "localhost", "0.0.0.0",
    "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16",
    ".space-z.ai", ".vercel.app", ".ngrok.io", ".ngrok.app", ".ngrok-free.app", ".localtunnel.me",
  ],
};

export default nextConfig;
