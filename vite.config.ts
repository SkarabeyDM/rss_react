import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = {
    POKEMONTCG_API_KEY: process.env.VITE_API_KEY,
    ...loadEnv(mode, process.cwd()),
  };

  console.log(process.env.POKEMONTCG_API_KEY);

  return defineConfig({
    plugins: [react()],
    base: '',
    define: {
      'process.env': process.env,
    },
  });
};
