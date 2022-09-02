import { Treasury } from 'models/generated/treasury/Treasury';
import { ContractNames, ContractsService, IContractsService } from './contracts-service';
import { DI } from 'aurelia';
import { ITransactionsService } from './transactions-service';
import { createEthereumService } from 'utils-testing/utils';
import { describe, expect, it } from 'vitest';

describe('transactions-service.ts', () => {
  it('transfers a token', async () => {
    const container = DI.createContainer();
    await createEthereumService(container);
    ContractsService.register(container);
    const transactionsService = container.get(ITransactionsService);
    const contractsService = container.get(IContractsService);
    const contract = contractsService.getContractFor<Treasury>(ContractNames.);

    contract.transfer();
    expect((await transactionsService.send(1)).number).toBe(1);
  });
});
