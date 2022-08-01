import { AllowedNetworks } from './services';

export const isDev = process.env.NODE_ENV === 'development';
export const ethereumNetwork = process.env.NETWORK as AllowedNetworks;
