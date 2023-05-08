import { DI } from 'aurelia';

export type IConfiguration = {
  chainId: number;
  ipfsGateway: string;
  chainUrl: string;
  chain: string;
  isDevelopment: boolean;
  showStorybook: boolean;
  scanLink: string;
  firebaseCollection: string;
  kGcUSD: string;
};

export const IConfiguration = DI.createInterface<IConfiguration>();
