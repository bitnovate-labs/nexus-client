import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@forms": path.resolve(__dirname, "components/forms"),
      "@modals": path.resolve(__dirname, "components/modals"),
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});
