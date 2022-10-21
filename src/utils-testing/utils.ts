import { CacheService, ICacheService } from 'services/cache-service';
import { EthereumService, IEthereumService } from './../services/ethereum-service';
import { IBrowserStorageService } from 'services/browser-storage-service';
import { IConfiguration } from 'configurations/configuration';
import { IContainer, Registration } from 'aurelia';
import { INotificationService } from 'design-system/services';
import { IReadOnlyProvider } from 'read-only-provider';
import { IWalletConnector } from 'wallet-provider';
import { getDefaultProvider } from 'ethers';
import { mock } from 'vitest-mock-extended';

/**
 * get or create a instance of IEthereumService in the given container
 * @param container
 * @param network
 * @returns
 */
export function createEthereumService(container: IContainer): IEthereumService {
  if (container.has(IEthereumService, true)) return container.get(IEthereumService);

  Registration.instance(
    IConfiguration,
    mock<IConfiguration>({
      chainId: 1,
    }),
  ).register(container);

  Registration.instance(IWalletConnector, mock<IWalletConnector>()).register(container);
  Registration.instance(IBrowserStorageService, mock<IBrowserStorageService>({})).register(container);
  Registration.instance(INotificationService, mock<INotificationService>({})).register(container);
  Registration.instance(IReadOnlyProvider, getDefaultProvider()).register(container);

  Registration.singleton(ICacheService, CacheService).register(container);
  Registration.singleton(IEthereumService, EthereumService).register(container);
  return container.get(IEthereumService);
}
