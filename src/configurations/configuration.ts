import { DI } from 'aurelia';

import { AllowedNetworks } from './../models/allowed-network';

export type IConfiguration = {
  chainId: number;
  ipfsGateway: string;
  chainUrl: string;
  chain: AllowedNetworks;
  isDevelopment: boolean;
  scanLink: string;
};

export const IConfiguration = DI.createInterface<IConfiguration>();
