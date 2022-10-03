import { fileURLToPath, URL } from 'node:url';
import React from '@vitejs/plugin-react';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    React(),
    AutoImport({ imports: ['react', 'react-router-dom'], dts: './src/auto-imports.d.ts' }),
  ],
  server: {
    port: 4200,
  },
});
