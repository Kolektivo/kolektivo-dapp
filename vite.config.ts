import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { Plugin, PluginOption, defineConfig, splitVendorChunkPlugin } from 'vite';
import { au2, rawHtml } from './vite.plugins';
import { visualizer } from 'rollup-plugin-visualizer';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import svgLoader from 'vite-svg-loader';
import swc from 'unplugin-swc';
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
    target: 'es2022',
  },
  plugins: [
    au2({ include: 'src/**/*.ts', pre: true }),
    au2({ include: 'src/**/*.html' }),
    swc.vite() as PluginOption,
    splitVendorChunkPlugin(),
    tsconfigPaths(),
    rawHtml(),
    svgLoader({
      defaultImport: 'url',
    }),
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
      http: 'http-browserify',
      https: 'https-browserify',
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
