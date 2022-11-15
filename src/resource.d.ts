/// <reference types="vite/client" />

declare module '*.html' {
  import { IContainer, PartialBindableDefinition } from 'aurelia';
  export const name: string;
  export const template: string;
  export default template;
  export const dependencies: string[];
  export const containerless: boolean | undefined;
  export const bindables: Record<string, PartialBindableDefinition>;
  export const shadowOptions: { mode: 'open' | 'closed' } | undefined;
  export function register(container: IContainer): void;
}
declare module 'lit-connect-modal';
declare module '*.css' {
  const value: string;
  export = value;
}
declare module '*.scss' {
  const value: string;
  export = value;
}
declare module '*.json' {
  const value: string;
  export = value;
}

declare module '*.svg' {
  const value: string;
  export = value;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
interface ImportMetaEnv {
  readonly KOL_IPFS_GATEWAY?: string;
  readonly KOL_CHAIN_ID?: string;
  readonly KOL_CHAIN_URL?: string;
  readonly KOL_FIREBASE_API_KEY?: string;
  readonly KOL_CHAIN?: string;
  readonly KOL_SCAN_LINK?: string;
  readonly KOL_TESTING?: string;
}

declare module 'rollup-plugin-html';
