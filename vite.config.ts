/// <reference types="vite/client" />

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {
    POKEMONTCG_API_KEY: process.env.VITE_API_KEY,
    ...loadEnv(mode, process.cwd()),
  };

  return defineConfig({
    plugins: [react()],
    base: "/rss_react/",
    resolve: {
      alias: {
        src: "/src",
        app: "/src/app",
        processes: "/src/processes",
        pages: "/src/pages",
        widgets: "/src/widgets",
        features: "/src/features",
        entities: "/src/entities",
        shared: "/src/shared",
      },
    },
    define: {
      "process.env": process.env
    }
  });
};
