import { BaseProvider } from '@ethersproject/providers/lib/base-provider';
import { Block } from '@ethersproject/providers';
import { EthereumService, IEthereumService } from './../services/ethereum-service';
import { IBrowserStorageService } from 'services';
import { IContainer, Registration } from 'aurelia';
import { INotificationService } from 'design-system/services';
import { IReadOnlyProvider } from 'provider';
import { mock } from 'vitest-mock-extended';

/**
 * get or create a instance of IEthereumService in the given container
 * @param container
 * @param network
 * @returns
 */
export function createEthereumService(container: IContainer): IEthereumService {
  if (container.has(IEthereumService, true)) return container.get(IEthereumService);

  Registration.instance(IBrowserStorageService, mock<IBrowserStorageService>({})).register(container);
  Registration.instance(INotificationService, mock<INotificationService>({})).register(container);
  Registration.instance(
    IReadOnlyProvider,
    mock<BaseProvider>({
      getBlock: (n: number) => {
        return new Promise((res) =>
          res(
            mock<Block>({
              number: n,
            }),
          ),
        );
      },
    }),
  ).register(container);
  Registration.singleton(IEthereumService, EthereumService).register(container);
  return container.get(IEthereumService);
}
