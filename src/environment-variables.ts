export const IS_DEV = import.meta.env.DEV;
export const IPFS_GATEWAY = import.meta.env.KOL_IPFS_GATEWAY;
export const FIREBASE_API_KEY = import.meta.env.KOL_FIREBASE_API_KEY;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const NETWORK = import.meta.env.KOL_NETWORK;
export const ETHERSCAN_LINK = import.meta.env.KOL_ETHERSCAN_LINK ?? 'https://alfajores-blockscout.celo-testnet.org/{type}/{address}';
export const IS_CELO = import.meta.env.KOL_NETWORK === 'Celo';
