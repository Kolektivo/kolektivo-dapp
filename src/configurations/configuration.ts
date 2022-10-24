import { AllowedNetworks } from './../models/allowed-network';
import { DI } from 'aurelia';

export type IConfiguration = {
  chainId: number;
  ipfsGateway: string;
  chainUrl: string;
  chain: AllowedNetworks;
  isDevelopment: boolean;
  etherscanLink: string;
};

export const IConfiguration = DI.createInterface<IConfiguration>();
