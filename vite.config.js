import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Use import.meta.url to get the directory name in ES modules
const __dirname = new URL(".", import.meta.url).pathname;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
});
