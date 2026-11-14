import { defineConfig } from "vite";

// Caminhos relativos permitem publicar também em uma subpasta do GitHub Pages.
export default defineConfig({
  base: "./",
  esbuild: { jsx: "automatic" },
});
