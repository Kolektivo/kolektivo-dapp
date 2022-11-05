import { ContractService, IContractService } from 'services';
import { DI } from 'aurelia';
import { Wallet } from '@ethersproject/wallet';
import { createEthereumService } from 'utils-testing/utils';
import { describe, expect, it } from 'vitest';

describe('contracts-service.ts', () => {
  it('gets a contract', async () => {
    const container = DI.createContainer();
    createEthereumService(container);
    ContractService.register(container);
    const contractService = container.get(IContractService);
    expect(contractService).toBeTypeOf('object');

    const contract = await contractService.getContract('monetary', 'Kolektivo Treasury Token');
    expect(contract).toBeTypeOf('object');
  });

  it('gets a contract that can sign', async () => {
    const container = DI.createContainer();
    createEthereumService(container);
    ContractService.register(container);
    const contractService = container.get(IContractService);
    expect(contractService).toBeTypeOf('object');

    const contract = await contractService.getContractForProvider(Wallet.createRandom(), 'monetary', 'Kolektivo Treasury Token');
    expect(contract).toBeTypeOf('object');
    expect(contract.signer).toBeTypeOf('object');
  });
});
