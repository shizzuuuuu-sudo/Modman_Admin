import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

   build: {
    sourcemap: false, // disables generating/loading source maps
  },
  css: {
    devSourcemap: false, // prevents Vite from trying to load CSS source maps
  },
})
