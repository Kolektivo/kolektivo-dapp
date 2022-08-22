export const isDev = import.meta.env.DEV;
export const ethereumNetwork: AllowedNetworks | undefined = import.meta.env.VITE_NETWORK;
export const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY;
export const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY;
export const ETHERSCAN_KEY = import.meta.env.VITE_ETHERSCAN_KEY;
