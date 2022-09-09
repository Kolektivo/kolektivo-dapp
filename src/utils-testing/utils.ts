import { ContractsDeploymentService, IBrowserStorageService, IContractsDeploymentService } from 'services';
import { EthereumService, IEthereumService } from './../services/ethereum-service';
import { IContainer, Registration } from 'aurelia';
import { INotificationService } from 'design-system/services';
import { mock } from 'vitest-mock-extended';

/**
 * get or create a instance of IEthereumService in the given container
 * @param container
 * @param network
 * @returns
 */
export function createEthereumService(container: IContainer, network: AllowedNetworks = 'Alfajores'): IEthereumService {
  let ethereumService: IEthereumService;

  try {
    ethereumService = container.get(IEthereumService);
    return ethereumService;
    // eslint-disable-next-line no-empty
  } catch {}

  Registration.instance(IBrowserStorageService, mock<IBrowserStorageService>({})).register(container);
  Registration.instance(INotificationService, mock<INotificationService>({})).register(container);
  Registration.singleton(IEthereumService, EthereumService).register(container);
  ethereumService = container.get(IEthereumService);
  ethereumService.initialize(network);
  return ethereumService;
}

/**
 * get or create a instance of IContractsDeploymentService in the given container
 * @param container
 * @param network
 * @returns
 */
export function createContractsDeploymentService(
  container: IContainer,
  network: AllowedNetworks = 'Alfajores',
): Promise<IContractsDeploymentService> {
  let contractsDeploymentService: IContractsDeploymentService;

  try {
    contractsDeploymentService = container.get(IContractsDeploymentService);
    return Promise.resolve(contractsDeploymentService);
    // eslint-disable-next-line no-empty
  } catch {}

  Registration.singleton(IContractsDeploymentService, ContractsDeploymentService).register(container);

  contractsDeploymentService = container.get(IContractsDeploymentService);

  return contractsDeploymentService.initialize(network).then(() => contractsDeploymentService);
}
