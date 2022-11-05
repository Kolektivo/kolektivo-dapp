import { defineConfig } from 'vitest/config';
import loadHtml from 'rollup-plugin-html';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    root: './src',
    exclude: ['**/__e2e__/**', 'node_modules', '/scripts'],
    testTimeout: 200000,
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [tsconfigPaths(), loadHtml()],
});
