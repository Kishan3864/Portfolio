import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained production build: `.next/standalone` ships only the traced
  // files (incl. the needed node_modules) so the VPS runs `node server.js`
  // without installing or building anything. The CI/CD pipeline uploads this
  // folder. The standalone server loads `.env*` from its own directory, so
  // `.env.local` (DATABASE_URL) must live alongside server.js on the server.
  output: "standalone",
  // Keep `pg` external so it isn't bundled (it relies on Node's dynamic requires).
  serverExternalPackages: ["pg"],
};

export default nextConfig;
