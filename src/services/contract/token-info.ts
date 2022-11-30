import { DI } from 'aurelia';

import type TokenListType from '../../tokenlist.json';

export type ITokenInfo = typeof TokenListType['tokens'][0] & { price?: number };

export type ITokenData = {
  tokens: Promise<ITokenInfo[]>;
};
export const ITokenData = DI.createInterface<ITokenData>();
export { TokenListType };

const tokenListUri = 'https://cdn.jsdelivr.net/gh/Kolektivo/tokenlists@main/tokenlist.json';

export const tokenData: ITokenInfo[] = await fetch(tokenListUri, {
  method: 'GET',
  headers: { accept: 'application/json' },
})
  .then(async (y) => (await y.json()) as typeof TokenListType)
  .then((x) => x.tokens);
