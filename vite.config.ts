import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Usa rutas relativas para que funcionen en cualquier entorno
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});


