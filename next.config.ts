import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep `pg` external so it isn't bundled (it relies on Node's dynamic requires).
  serverExternalPackages: ["pg"],
};

export default nextConfig;
