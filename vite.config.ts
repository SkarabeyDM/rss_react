import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { ghPages } from 'vite-plugin-gh-pages';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), ghPages()],
    base: '/rss_react/',
    resolve: {
      alias: [
        { find: '@src', replacement: resolve(__dirname, './src') },
        { find: '@shared', replacement: resolve(__dirname, './src/shared') },
        { find: '@app', replacement: resolve(__dirname, './src/app') },
        { find: '@widgets', replacement: resolve(__dirname, './src/widgets') },
        { find: '@pages', replacement: resolve(__dirname, './src/pages') },
        {
          find: '@features',
          replacement: resolve(__dirname, './src/features'),
        },
        {
          find: '@entities',
          replacement: resolve(__dirname, './src/entities'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@shared/style/variables.scss" as *;',
        },
      },
    },
  };
});
