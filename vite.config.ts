import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.jpeg", "**/*.svg"],
  server: {
    allowedHosts: ["1005-2a09-bac5-5041-16a0-00-241-6d.ngrok-free.app"],
  },
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
