import { defineConfig } from 'vitest/config'
import loadHtml from 'rollup-plugin-html';

export default defineConfig({
  test: {
    // ...
  },
  plugins: [loadHtml()]
})
