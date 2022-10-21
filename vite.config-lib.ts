import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { Plugin, PluginOption, defineConfig, splitVendorChunkPlugin } from 'vite';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [nodePolyfills() as Plugin],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    outDir: 'scripts',
    target: 'es2022',
    lib: {
      entry: resolve(__dirname, './src/firebase.ts'),
      name: 'update-chart-data',

      fileName: 'update-chart-data',
      formats: ['es'],
    },
  },
  plugins: [
    swc.vite() as PluginOption,
    splitVendorChunkPlugin(),
    tsconfigPaths(),

    visualizer({
      emitFile: true,
      gzipSize: true,
      filename: 'stats.html',
    }) as Plugin,
  ],
  define: {
    'process.env': process.env,
  },
  envPrefix: 'KOL',
  resolve: {
    alias: {
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      util: 'util',
      Buffer: 'buffer',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2022',
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: false,
        }),
      ],
    },
  },
});
