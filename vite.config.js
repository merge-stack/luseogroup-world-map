import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "1005-2a09-bac5-5041-16a0-00-241-6d.ngrok-free.app"
    ]
  }
})
