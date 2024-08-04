import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Esto asegura que los source maps se generen
  },
  server: {
    sourcemap: true, // Si estás desarrollando, esto ayudará a depurar
  }
})

