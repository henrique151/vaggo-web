import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/dabf2vbrl/**")],
  },
  output: "standalone", //to work with docker ig
  /* config options here */
};

export default nextConfig;
