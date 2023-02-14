import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Dashboard - Home',
        short_name: 'Dashboard',
        start_url: '/',
        display: 'standalone',
        background_color: '#121220',
        lang: 'en',
        scope: '/',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
        theme_color: '#ffffff',
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   console.log(id);
        //   if (id.includes('react-dom')) {
        //     return 'react';
        //   } else if (id.includes('recharts')) {
        //     return 'recharts';
        //   } else if (id.includes('node_modules')) {
        //     return 'modules';
        //   }
        // },
      },
    },
    chunkSizeWarningLimit: 400,
    assetsInlineLimit: 4096,
  },
});
