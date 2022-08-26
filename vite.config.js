import loadHtml from "rollup-plugin-html";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { hmrPlugin, rawHtml } from "./vite.plugins";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  server: {
    port: 9000,
    strictPort: true
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills()]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  plugins: [
    splitVendorChunkPlugin(),
    tsconfigPaths(),
    loadHtml({
      include: "**/*.html",
      exclude: "index.html"
    }),
    rawHtml(),
    hmrPlugin(),
    svgLoader({
      defaultImport: "url"
    }),
    visualizer({
      emitFile: true,
      gzipSize: true,
      file: "stats.html"
    })
  ],
  define: {
    "process.env": process.env
  },
  envPrefix: "KOL",
  resolve: {
    alias: {
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: "util",
      http: "http-browserify",
      https: "https-browserify",
      Buffer: "buffer"
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis"
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true
        })
      ]
    }
  }
});
