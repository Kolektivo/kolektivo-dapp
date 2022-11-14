export const IS_DEV = import.meta.env.DEV;
export const IPFS_GATEWAY = import.meta.env.KOL_IPFS_GATEWAY;
export const CHAIN_ID = Number(import.meta.env.KOL_CHAIN_ID ?? 42220);
export const CHAIN_URL = import.meta.env.KOL_CHAIN_URL ?? 'https://forno.celo.org';
export const FIREBASE_API_KEY = import.meta.env.KOL_FIREBASE_API_KEY;
export const CHAIN = import.meta.env.KOL_CHAIN ?? 'Celo';
export const SCAN_LINK = import.meta.env.KOL_SCAN_LINK ?? 'https://explorer.celo.org/{type}/{address}';
