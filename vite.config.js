import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import path from "path";
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
      // "@components": path.resolve(__dirname, "src/components"),
      "@components": fileURLToPath(new URL("src/components", import.meta.url)),
      // Define an alias for the 'pages' directory (if you have one)
      // "@graphql": path.resolve(__dirname, "src/graphql"),
      // "@hooks": path.resolve(__dirname, "src/hooks"),
      // "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
});
