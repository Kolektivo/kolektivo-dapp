/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AllowedNetworks } from './services';

export const isDev = process.env.NODE_ENV === 'development';
export const ethereumNetwork = process.env.NETWORK as AllowedNetworks | undefined;
export const COINGECKO_API_KEY = process.env.COINGECKO_API_KEY!;
export const IPFS_GATEWAY = process.env.IPFS_GATEWAY!;
export const ETHERSCAN_KEY = process.env.ETHERSCAN_KEY!;
