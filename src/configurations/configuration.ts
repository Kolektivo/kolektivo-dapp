import { AllowedNetworks } from './../models/allowed-network';
import { DI } from 'aurelia';

export type IConfiguration = {
  ipfsGateway: string;
  network: AllowedNetworks;
  isDevelopment: boolean;
  etherscanLink: string;
};

export const IConfiguration = DI.createInterface<IConfiguration>();
