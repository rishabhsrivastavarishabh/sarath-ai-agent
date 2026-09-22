import type { NextConfig } from "next";
import { withEve } from "eve/next";

const nextConfig: NextConfig = {
  // Skip repeating codegen-time typechecking on every deployment build.
  typescript: { ignoreBuildErrors: true },
  // Allow sandboxed live-preview hosts to load dev resources (HMR chunks).
  allowedDevOrigins: ["*.e2b.app"],
};

export default withEve(nextConfig);
