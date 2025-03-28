import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  assetsInclude: ["**/*.jpg", "**/*.png", "**/*.jpeg", "**/*.svg"],
  server: {
    allowedHosts: ["1005-2a09-bac5-5041-16a0-00-241-6d.ngrok-free.app"],
  },
  define: {
    "process.env": {}, // Prevents "process is not defined" error
  },
  build: {
    lib: {
      entry: "./src/main.tsx",
      name: "MyViteApp",
      fileName: "bundle",
      formats: ["umd", "es"],
    },
  },
});
