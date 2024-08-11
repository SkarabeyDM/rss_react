import { defineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import viteConfig from './vite.config';

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      plugins: [react()],
      test: {
        environment: 'jsdom',
        setupFiles: ['vitest-setup.ts'],
        globals: true,
      },
    })
  )
);
