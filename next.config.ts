import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained production build: `.next/standalone` ships only the traced
  // files (incl. the needed node_modules) so the VPS runs `node server.js`
  // without installing or building anything. The CI/CD pipeline uploads this
  // folder. The standalone server loads `.env*` from its own directory, so
  // `.env.local` (DATABASE_URL) must live alongside server.js on the server.
  output: "standalone",
  // Keep `pg` and `nodemailer` external so they aren't bundled (both rely on
  // Node's dynamic requires) — they're traced into the standalone output instead.
  serverExternalPackages: ["pg", "nodemailer"],
};

export default nextConfig;
