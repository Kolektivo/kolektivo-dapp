/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as rollupPluginutils from 'rollup-pluginutils';
import { Plugin } from 'vite';
import { createFilter } from '@rollup/pluginutils';
import { preprocess } from '@aurelia/plugin-conventions';

export function au2(options: { include?: string; exclude?: string; pre?: boolean }) {
  const filter = createFilter(options.include, options.exclude);

  return {
    name: 'au2',
    enforce: options.pre ? 'pre' : 'post',
    transform: function transform(code: string, id: string) {
      if (!filter(id)) return;
      const result = preprocess(
        {
          path: id,
          contents: code,
        },
        { hmr: true, hmrModule: 'import.meta' },
      )?.code;
      return { code: result ?? code };
    },
  } as Plugin;
}

export const rawHtml = () => {
  const filter = rollupPluginutils.createFilter('**/*.ts', undefined);
  return {
    name: 'raw',
    transform: function transform(code: string, id: string) {
      if (!filter(id)) return;
      if (code.includes('__au2ViewDef')) return;
      code = code.replaceAll(/(import .* from .*)\.html/g, '$1.html?raw');
      return { code };
    },
  };
};
