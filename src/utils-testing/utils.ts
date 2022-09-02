import { EthereumService, IEthereumService } from './../services/ethereum-service';
import { IBrowserStorageService } from 'services';
import { IContainer, Registration } from 'aurelia';
import { INotificationService } from 'design-system/services';
import { mock } from 'vitest-mock-extended';

/**
 * create a new instance of the EthereumService in the given container
 * @param container
 * @param network
 * @returns
 */
export function createEthereumService(container: IContainer, network: AllowedNetworks = 'Alfajores'): Promise<IEthereumService> {
  Registration.instance(IBrowserStorageService, mock<IBrowserStorageService>({})).register(container);
  Registration.instance(INotificationService, mock<INotificationService>({})).register(container);
  Registration.transient(IEthereumService, EthereumService).register(container);

  const ethereumService = container.get(IEthereumService);

  return ethereumService.initialize(network).then(() => ethereumService);
}
