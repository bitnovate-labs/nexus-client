import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    extensions: [".js", ".jsx"], // Ensure .jsx is included
    alias: {
      // Define an alias for the 'components' directory
      "@components": fileURLToPath(new URL("src/components", import.meta.url)),
      "@pages": fileURLToPath(new URL("src/pages", import.meta.url)),
      "@hooks": fileURLToPath(new URL("src/hooks", import.meta.url)),
      "@graphql": fileURLToPath(new URL("src/graphql", import.meta.url)),
      "@utils": fileURLToPath(new URL("src/utils", import.meta.url)),
    },
  },
});
