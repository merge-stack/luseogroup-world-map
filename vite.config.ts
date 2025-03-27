import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { viteSingleFile } from "vite-plugin-singlefile";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), viteSingleFile()],
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.jpeg", "**/*.svg"],
  server: {
    allowedHosts: ["1005-2a09-bac5-5041-16a0-00-241-6d.ngrok-free.app"],
  },
  build: {
    cssCodeSplit: false, // Ensures CSS is bundled into the HTML
    assetsInlineLimit: 100000000, // Large limit to inline all assets (adjust as needed)
    rollupOptions: {
      // @ts-ignore
      output: {
        manualChunks: false, // Prevents splitting into multiple chunks
      },
    },
  },
});
