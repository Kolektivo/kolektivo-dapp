import { DI } from 'aurelia';

export type IConfiguration = {
  chainId: number;
  ipfsGateway: string;
  chainUrl: string;
  chain: string;
  isDevelopment: boolean;
  scanLink: string;
};

export const IConfiguration = DI.createInterface<IConfiguration>();
