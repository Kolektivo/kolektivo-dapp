import { defineConfig } from 'vite';
import inject from '@rollup/plugin-inject'

// vite.config.js
const htmlImport = {
    name: "htmlImport",
    /**
     * Checks to ensure that a html file is being imported.
     * If it is then it alters the code being passed as being a string being exported by default.
     * @param {string} code The file as a string.
     * @param {string} id The absolute path. 
     * @returns {{code: string}}
     */
    transform(code, id) {
      if (/^.*\.html$/g.test(id)) {
        code = `export default \`${code.replaceAll('${', '\\${')}\``;
      }


      return { code }
    }
  }
  
  export default defineConfig({
    plugins: [ htmlImport ],
    define:{
      'process.env': process.env
    },
    envPrefix: 'KOL',
    resolve: {
      alias: {
        process: "process/browser",
        stream: "stream-browserify",
        zlib: "browserify-zlib",
        util: 'util',
        http: 'http-browserify',
        https: 'https-browserify',
        Buffer: 'buffer'
      }
    },
  });