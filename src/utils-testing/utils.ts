import { EthereumService, IEthereumService } from './../services/ethereum-service';
import { IBrowserStorageService } from 'services';
import { IContainer, Registration } from 'aurelia';
import { INotificationService } from 'design-system/services';
import { mock } from 'vitest-mock-extended';

/**
 * get or create a instance of IEthereumService in the given container
 * @param container
 * @param network
 * @returns
 */
export function createEthereumService(container: IContainer, network: AllowedNetworks = 'Alfajores'): Promise<IEthereumService> {
  let ethereumService: IEthereumService;

  try {
    ethereumService = container.get(IEthereumService);
    return Promise.resolve(ethereumService);
    // eslint-disable-next-line no-empty
  } catch {}

  Registration.instance(IBrowserStorageService, mock<IBrowserStorageService>({})).register(container);
  Registration.instance(INotificationService, mock<INotificationService>({})).register(container);
  Registration.singleton(IEthereumService, EthereumService).register(container);
  ethereumService = container.get(IEthereumService);
  return ethereumService.initialize(network).then(() => ethereumService);
}
