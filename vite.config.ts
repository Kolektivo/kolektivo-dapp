import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { Plugin, defineConfig, splitVendorChunkPlugin } from 'vite';
import { hmrPlugin, rawHtml } from './vite.plugins';
import { visualizer } from 'rollup-plugin-visualizer';
import loadHtml from 'rollup-plugin-html';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import svgLoader from 'vite-svg-loader';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    port: 9000,
    strictPort: true,
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills() as Plugin],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  plugins: [
    splitVendorChunkPlugin(),
    tsconfigPaths(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    loadHtml({
      include: '**/*.html',
      exclude: 'index.html',
    }),
    rawHtml(),
    hmrPlugin(),
    svgLoader({
      defaultImport: 'url',
    }),
    visualizer({
      emitFile: true,
      gzipSize: true,
      filename: 'stats.html',
    }),
  ],
  define: {
    'process.env': process.env,
  },
  envPrefix: 'KOL',
  resolve: {
    alias: {
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      http: 'http-browserify',
      https: 'https-browserify',
      Buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
      ],
    },
  },
});
