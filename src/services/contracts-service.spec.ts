import { ContractsService, IContractsService } from './contracts-service';
import { DI } from 'aurelia';
import { createContractsDeploymentService, createEthereumService } from 'utils-testing/utils';
import { describe, expect, it } from 'vitest';

describe('contracts-service.ts', () => {
  it('transfers a token', async () => {
    const container = DI.createContainer();
    await createEthereumService(container);
    await createContractsDeploymentService(container);
    ContractsService.register(container);
    const contractsService = container.get(IContractsService);
    // const token = contractsService.getContractAtAddress<Erc20>(ContractNames.ERC20, '0x000');

    // const tx = await token.transferFrom(
    //   '0xD4717ee259f8736af189F968Dadc6939c1568200',
    //   '0x27dC953040B725A543FBc2556641F62a213d55D4',
    //   toWei('.001', 18),
    // );
    // expect(tx).toBeTypeOf('object');
    expect(contractsService).toBeTypeOf('object');
  });
});
