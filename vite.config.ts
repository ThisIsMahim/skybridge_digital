import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Use esbuild for faster minification
    minify: 'esbuild',
    // Disable sourcemaps in production for smaller bundle
    sourcemap: mode !== 'production',
    // Drop console in production
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },
}));
