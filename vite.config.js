import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import alias from "@rollup/plugin-alias";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    alias({
      entries: [
        { find: "@forms", replacement: "../../../components/forms" },
        { find: "@modals", replacement: "../../../components/modals" },
      ],
    }),
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  // resolve: {
  //   alias: {
  //     "@components/forms": "/src/components/forms",
  //     "@components/modals": "/src/components/modals",
  //   },
  // },
});
