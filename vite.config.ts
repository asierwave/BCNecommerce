// filepath: /Users/asier/Documents/GitHub/BCNecommerce/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/BCNecommerce/' : '/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});



