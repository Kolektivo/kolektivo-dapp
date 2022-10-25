import { AllowedNetworks } from '../models/allowed-network';
import { DI, IRegistration, Registration } from 'aurelia';
import { ETHERSCAN_LINK, IPFS_GATEWAY, IS_DEV, NETWORK } from '../environment-variables';

export type IConfiguration = {
  ipfsGateway: string;
  network: AllowedNetworks;
  isDevelopment: boolean;
  etherscanLink: string;
};

export const IConfiguration = DI.createInterface<IConfiguration>();

export function configurationFromEnv(): IRegistration {
  return Registration.instance(IConfiguration, {
    ipfsGateway: IPFS_GATEWAY,
    network: NETWORK,
    isDevelopment: IS_DEV,
    etherscanLink: ETHERSCAN_LINK,
  });
}

export function configurationFromCustom(custom: Partial<IConfiguration>): IRegistration {
  return Registration.instance(IConfiguration, custom);
}
