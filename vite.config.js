import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      "@components": "/src/components",
      "@hooks": "/src/hooks",
      "@util": "/src/util",
    },
  },
});
