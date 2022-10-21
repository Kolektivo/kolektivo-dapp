import { AllowedNetworks } from './models/allowed-network';
export const IS_DEV = import.meta.env.DEV;
export const IPFS_GATEWAY = import.meta.env.KOL_IPFS_GATEWAY;
export const CHAIN_ID = Number(import.meta.env.KOL_CHAIN_ID ?? 44787);
export const CHAIN_URL = import.meta.env.KOL_CHAIN_URL ?? 'https://alfajores-forno.celo-testnet.org';
export const FIREBASE_API_KEY = import.meta.env.KOL_FIREBASE_API_KEY;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const CHAIN: AllowedNetworks = (import.meta.env.KOL_CHAIN as AllowedNetworks) || AllowedNetworks.Alfajores;
export const SCAN_LINK = import.meta.env.KOL_SCAN_LINK ?? 'https://alfajores-blockscout.celo-testnet.org/{type}/{address}';
export const IS_CELO = CHAIN === 'Celo';
