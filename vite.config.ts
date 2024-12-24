import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/BCNecommerce/', // Reemplaza 'nombre-del-repositorio' con el nombre real de tu repositorio
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': 'https://asierwave.github.io/BCNecommerce/',
    },
  },
});