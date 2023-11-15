/// <reference types="vitest" />
/// <reference types="vite/client" />

import { PluginOption, defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { configDefaults } from 'vitest/dist/config';

// https://vitejs.dev/config/

function excludeMsw(): PluginOption {
  return {
    name: 'exclude-msw',
    resolveId(source) {
      return source === 'virtual-module' ? source : null;
    },
    renderStart(outputOptions) {
      const outDir = outputOptions.dir;
      const msWorker = path.resolve(outDir ?? '', 'mockServiceWorker.js');
      fs.rm(msWorker, () => console.log(`Deleted ${msWorker}`));
    },
  };
}

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {
    POKEMONTCG_API_KEY: process.env.VITE_API_KEY,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    plugins: [react(), excludeMsw()],
    base: '/rss_react',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/setupTests.ts'],
      include: ['**/*.{test,spec}.ts?(x)'],
      exclude: [...configDefaults.exclude, '*.js'],
      coverage: { include: ['src/**/*'] },
    },
    define: {
      'process.env': process.env,
    },
    build: {
      rollupOptions: {
        external: ['*.test.*'],
      },
    },
  });
};
