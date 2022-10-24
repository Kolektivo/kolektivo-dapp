import { DI } from 'aurelia';
import { ITokenInfo, ITokenListUniswap } from 'services/token-types';

const tokenListUri = 'https://cdn.jsdelivr.net/gh/Kolektivo/tokenlists@main/tokenlist.json';

export const getTokenInfos = () =>
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  globalThis.fetch
    ? globalThis
        .fetch(tokenListUri, { method: 'GET', headers: { accept: 'application/json' } })
        .then(async (y) => (await y.json()) as ITokenListUniswap)
        .then((y) => y.tokens as ITokenInfo[])
    : [];

export type ITokenData = {
  tokens: Promise<ITokenInfo[]>;
};
export const ITokenData = DI.createInterface<ITokenData>();
