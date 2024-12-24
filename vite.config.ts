import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/modern-ecommerce/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});