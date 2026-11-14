import type { NextConfig } from "next";

// Static export. Works on Vercel (no base path) and on GitHub Pages
// (set NEXT_PUBLIC_BASE_PATH=/<repo-name> at build time; the deploy workflow does this).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// `npm run dev` only: hostnames other than localhost that may load the dev server.
// Without this, Next.js blocks its dev websocket on forwarded URLs (GitHub Codespaces,
// tunnels), the page never hydrates, and nothing interactive works.
// Add your own with NEXT_ALLOWED_DEV_ORIGINS="host-one.example,*.host-two.example".
const allowedDevOrigins = [
  "127.0.0.1",
  "*.app.github.dev",
  "*.githubpreview.dev",
  "*.devtunnels.ms",
  "*.ngrok-free.app",
  "*.ngrok.app",
  "*.trycloudflare.com",
  ...(process.env.NEXT_ALLOWED_DEV_ORIGINS?.split(",").map((s) => s.trim()).filter(Boolean) ?? []),
];

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  allowedDevOrigins,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
