import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import { ITokenInfo, ITokenListUniswap } from 'services/token-types';
import { isCelo } from 'environment-variables';

const tokenListUri = 'https://cdn.jsdelivr.net/gh/Kolektivo/tokenlists@main/tokenlist.json';
const endpoint = isCelo ? 'https://celo.rpcs.dev:8545' : `https://alfajores.rpcs.dev:8545`;

export const defaultProvider = new CeloProvider(endpoint);

export const tokenInfos =
  typeof window !== 'undefined'
    ? await fetch(tokenListUri, { method: 'GET', headers: { accept: 'application/json' } })
        .then(async (y) => (await y.json()) as ITokenListUniswap)
        .then((y) => y.tokens as ITokenInfo[])
    : [];
