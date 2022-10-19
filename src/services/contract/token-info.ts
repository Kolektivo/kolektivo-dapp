import { ITokenInfo, ITokenListUniswap } from 'services/token-types';

const tokenListUri = 'https://cdn.jsdelivr.net/gh/Kolektivo/tokenlists@main/tokenlist.json';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const tokenInfos = fetch
  ? await fetch(tokenListUri, { method: 'GET', headers: { accept: 'application/json' } })
      .then(async (y) => (await y.json()) as ITokenListUniswap)
      .then((y) => y.tokens as ITokenInfo[])
  : [];
