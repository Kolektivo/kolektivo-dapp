export const IS_DEV = import.meta.env.DEV;
export const IPFS_GATEWAY = import.meta.env.KOL_IPFS_GATEWAY;
export const CHAIN_ID = Number(import.meta.env.KOL_CHAIN_ID ?? 42220);
export const CHAIN_URL = import.meta.env.KOL_CHAIN_URL ?? 'https://celo-mainnet.infura.io/v3/29bc61de607c4369a2535498fd21fd00';
export const FIREBASE_API_KEY = import.meta.env.KOL_FIREBASE_API_KEY;
export const SHOW_STORYBOOK = Boolean(import.meta.env.KOL_SHOW_STORYBOOK);
export const CHAIN = import.meta.env.KOL_CHAIN ?? 'Celo';
export const SCAN_LINK = import.meta.env.KOL_SCAN_LINK ?? 'https://explorer.celo.org/{type}/{address}';
export const IS_TESTING = import.meta.env.KOL_TESTING === 'true';
export const FIREBASE_COLLECTION = import.meta.env.KOL_FIREBASE_COLLECTION ?? 'chartData';
export const KG_CUSD = import.meta.env.KOL_KG_CUSD ?? '';
