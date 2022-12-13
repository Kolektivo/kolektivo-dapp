import { DI } from 'aurelia';

export interface ITokenInfo 
{
  address: string,
  chainId: number,
  name: string,
  symbol: string,
  decimals: number,
  logoURI: string,
  id: number,
  price?: number
}

interface ITokenListType
{
  name: string,
  timestamp: string,
  version: {
      major: number,
      minor: number,
      patch: number
  },
  keywords: string[],
  tokens: ITokenInfo[]
}


export type ITokenData = {
  tokens: Promise<ITokenInfo[]>;
};
export const ITokenData = DI.createInterface<ITokenData>();

const tokenListUri = 'https://cdn.jsdelivr.net/gh/Kolektivo/tokenlists@main/tokenlist.json';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const tokenData: ITokenInfo[] =
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  globalThis.fetch !== undefined
    ? await fetch(tokenListUri, {
        method: 'GET',
        headers: { accept: 'application/json' },
      })
        .then(async (y) => (await y.json()) as ITokenListType)
        .then((x) => x.tokens)
    : [];
[];
