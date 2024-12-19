import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import alias from "@rollup/plugin-alias";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [{ find: "components", replacement: "/src/components" }],
    }),
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      // Alias for utils folder
      components: "/src/components",
    },
  },
});
