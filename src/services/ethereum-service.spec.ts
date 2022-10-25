import { BaseProvider } from '@ethersproject/providers/lib/base-provider';
import { Block } from '@ethersproject/providers';
import { DI } from 'aurelia';
import { IBlockInfo, IEthereumService } from './ethereum-service';
import { createEthereumService } from 'utils-testing/utils';
import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('ethereum-service.ts', () => {
  it('demonstrate mocking service functions', async () => {
    const readOnlyProviderMock = mock<BaseProvider>({
      getBlock: (n: number) => {
        return new Promise((res) =>
          res(
            mock<Block>({
              number: n,
            }),
          ),
        );
      },
    });

    const service = mock<IEthereumService>({
      getBlock: async (n) => {
        return (await readOnlyProviderMock.getBlock(n)) as unknown as IBlockInfo;
      },
      readOnlyProvider: readOnlyProviderMock,
    });
    expect((await service.getBlock(1)).number).toBe(1);
  });

  it('confirms creation of readonlyProvider', () => {
    const container = DI.createContainer();
    const ethereumService = createEthereumService(container);
    expect(ethereumService.readOnlyProvider).toBeTruthy();
    expect(ethereumService.readOnlyProvider).toBeTypeOf('object');
    expect(ethereumService.readOnlyProvider.network).toBeTypeOf('object');
  });

  it('getBlock works', async () => {
    const container = DI.createContainer();
    const ethereumService = createEthereumService(container);
    expect((await ethereumService.getBlock(1)).number).toBe(1);
  });
});
