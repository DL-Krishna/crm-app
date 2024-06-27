import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    outDir: 'build',
  },
  optimizeDeps: {
    include: [
      'react-router-dom', // Ensure react-router-dom is included in optimizeDeps
    ],
  },
  server: {
    historyApiFallback: true
  }
})