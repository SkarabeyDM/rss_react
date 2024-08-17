import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') },
      { find: '@shared', replacement: resolve(__dirname, './src/shared') },
      { find: '@style', replacement: resolve(__dirname, './src/shared/style') },
      { find: '@app', replacement: resolve(__dirname, './src/app') },
      { find: '@widgets', replacement: resolve(__dirname, './src/widgets') },
      { find: '@pages', replacement: resolve(__dirname, './src/pages') },
      { find: '@tests', replacement: resolve(__dirname, './src/tests') },
      {
        find: '@features',
        replacement: resolve(__dirname, './src/features'),
      },
    ],
  },
})
