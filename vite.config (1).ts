
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This allows process.env.API_KEY to be used in your code
    'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY || process.env.API_KEY),
  },
  server: {
    port: 3000
  }
});
