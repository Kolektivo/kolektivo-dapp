import { AllowedNetwork, AllowedNetworks } from 'models/allowed-network';
import { CacheService, IBrowserStorageService, ICacheService } from 'services';
import { EthereumService, IEthereumService } from './../services/ethereum-service';
import { IContainer, Registration } from 'aurelia';
import { INotificationService } from 'design-system/services';
import { Signer } from '@ethersproject/abstract-signer';
import { Wallet } from '@ethersproject/wallet';
import { configurationFromCustom } from 'configurations/configuration';
import { mock } from 'vitest-mock-extended';

/**
 * get or create a instance of IEthereumService in the given container
 * @param container
 * @param network
 * @returns
 */
export function createEthereumService(container: IContainer, network: AllowedNetwork = AllowedNetworks.Alfajores): IEthereumService {
  let ethereumService: IEthereumService;

  try {
    ethereumService = container.get(IEthereumService);
    return ethereumService;
    // eslint-disable-next-line no-empty
  } catch {}

  Registration.instance(IBrowserStorageService, mock<IBrowserStorageService>({})).register(container);
  Registration.instance(INotificationService, mock<INotificationService>({})).register(container);
  Registration.singleton(ICacheService, CacheService).register(container);
  configurationFromCustom({
    network,
    isDevelopment: true,
  }).register(container);
  Registration.singleton(IEthereumService, EthereumService).register(container);
  ethereumService = container.get(IEthereumService);
  ethereumService.initialize(network);
  return ethereumService;
}

export function createSigner(privateKey: string, ethereumService: IEthereumService): Signer {
  return new Wallet(privateKey, ethereumService.readOnlyProvider);
}
