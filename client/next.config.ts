import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// next.config.js
const withPWA = require("next-pwa")({
  dest: "public", // service worker + manifest live here
  register: true,
  skipWaiting: true, // disable in dev
});

module.exports = withPWA({});


export default nextConfig;
