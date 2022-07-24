import * as path from "path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(path.dirname("."), "lib/public_api.tsx"),
      name: "React Library Vite",
      fileName: (format) => `react-library-vite.${format}.js`,
      formats: ["cjs", "es"],
    },

    rollupOptions: {
      // externalize deps that shouldn't be bundled
      // into your library
      external: ["react/jsx-runtime", "react"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
      },
    },
  },
  root: ".",
  test: {
    globals: true,
    environment: "happy-dom",
    isolate: true,
    cache: { dir: "cache/vitest" },
  },
  plugins: [react()],
});
