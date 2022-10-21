export const isDev = import.meta.env.DEV;
export const ethereumNetwork = import.meta.env.KOL_NETWORK;
export const isCelo = ethereumNetwork === 'Celo';
export const IPFS_GATEWAY = import.meta.env.KOL_IPFS_GATEWAY;
export const FIREBASE_API_KEY = import.meta.env.KOL_FIREBASE_API_KEY;
export const CHAIN_URL = import.meta.env.KOL_CHAIN_URL ?? 'https://alfajores-forno.celo-testnet.org';
