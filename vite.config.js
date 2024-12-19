import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "log-resolve",
      resolveId(source) {
        console.log("Resolving:", source);
        return null; // Proceed with default resolution
      },
    },
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    extensions: [".js", ".jsx"], // Ensure .jsx is included
  },
});
