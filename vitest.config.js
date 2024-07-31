import { defineConfig, mergeConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { svelteTesting } from '@testing-library/svelte/vite';
import viteConfig from './vite.config';

export default defineConfig((configEnv) =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      plugins: [svelte(), svelteTesting()],
      test: {
        environment: 'jsdom',
        setupFiles: ['vitest-setup.ts'],
        globals: true,
      },
    })
  )
);
