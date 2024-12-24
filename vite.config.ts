import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/BCNecommerce/', // Correcto para GitHub Pages
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      // Mantén el proxy si usas un servidor API local, de lo contrario elimínalo
      '/api': 'http://localhost:5000', 
    },
  },
});
