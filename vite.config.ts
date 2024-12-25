// filepath: /Users/asier/Documents/GitHub/BCNecommerce/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/BCNecommerce/', // Reemplaza 'BCNecommerce' con el nombre de tu repositorio
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});