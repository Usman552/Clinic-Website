import type { NextConfig } from "next";

// GitHub Pages serves static files from /<repo-name>/, so the deploy build
// (GITHUB_PAGES=true) exports static HTML under that base path. Local dev and
// normal `next build` keep image optimisation and the "/" -> "/en" redirect.
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "Clinic-Website";

const nextConfig: NextConfig = isPages
  ? {
      output: "export",
      basePath: `/${repo}`,
      trailingSlash: true,
      images: { unoptimized: true },
      env: { NEXT_PUBLIC_BASE_PATH: `/${repo}` },
    }
  : {
      images: { formats: ["image/avif", "image/webp"] },
      async redirects() {
        return [{ source: "/", destination: "/en", permanent: false }];
      },
    };

export default nextConfig;
