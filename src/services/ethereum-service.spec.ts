import { BaseProvider } from '@ethersproject/providers/lib/base-provider';
import { Block } from '@ethersproject/providers';
import { IBlockInfo, IEthereumService } from './ethereum-service';
import { describe, expect, it } from 'vitest';
import { mock } from 'vitest-mock-extended';

describe('ethereum-service.ts', () => {
  it('displays store connected wallet address', async () => {
    const readOnlyProviderMock = mock<BaseProvider>({
      getBlock: (n: number) => {
        return new Promise((res) =>
          res(
            mock<Block>({
              number: 1,
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
});
