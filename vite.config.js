import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import pkg from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    _APP_VERSION_: JSON.stringify(pkg.version), // Inject the version into the application
  },
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    extensions: [".js", ".jsx"], // Ensure .jsx is included
    alias: {
      // Define an alias for the 'components' directory
      "@assets": fileURLToPath(new URL("src/assets", import.meta.url)),
      "@components": fileURLToPath(new URL("src/components", import.meta.url)),
      "@contexts": fileURLToPath(new URL("src/contexts", import.meta.url)),
      "@graphql": fileURLToPath(new URL("src/graphql", import.meta.url)),
      "@hooks": fileURLToPath(new URL("src/hooks", import.meta.url)),
      "@pages": fileURLToPath(new URL("src/pages", import.meta.url)),
      "@utils": fileURLToPath(new URL("src/utils", import.meta.url)),
    },
  },
});
