import { BigNumber } from '@ethersproject/bignumber';
import { CacheService, ContractService, IContractService, toWei } from 'services';
import { DI } from 'aurelia';
import { defaultProvider } from './token-info';
import { describe, expect, it } from 'vitest';
import { ethers } from 'ethers';

describe('contracts-service.ts', () => {
  it('transfers a token', async () => {
    const container = DI.createContainer();
    ContractService.register(container);
    CacheService.register(container);
    const contractService = container.get(IContractService);
    expect(contractService).toBeTypeOf('object');

    const testAccount1 = '0xD4717ee259f8736af189F968Dadc6939c1568200';
    const testAccount2 = '0x27dC953040B725A543FBc2556641F62a213d55D4';

    const testAccountKey1 = '6f4d3eace598f27f60c59fa4132c5b4030a61bd50569c16f4cac33beae1eb0e0';
    // const testAccountKey2 = '9d248ff51e5f66b5bbf4f17a417a93d7dceb971f3f44909bea806d581d9aa0fb';

    const testTokenAddress = '0x44d7697a76cb17d858196797432f745e4bc5fe39';
    const transferAmount = BigNumber.from(toWei('.001', 18));
    const token = contractService.getTokenContract(testTokenAddress, undefined, new ethers.Wallet(testAccountKey1, defaultProvider));

    const startingBalanceAccount1 = await token.balanceOf(testAccount1);
    const startingBalanceAccount2 = await token.balanceOf(testAccount2);

    const tx = await token.transfer(testAccount2, transferAmount);
    expect(tx).toBeTypeOf('object');

    const endingBalanceAccount1 = await token.balanceOf(testAccount1);
    const endingBalanceAccount2 = await token.balanceOf(testAccount2);

    expect(endingBalanceAccount1.sub(startingBalanceAccount1).eq(transferAmount));
    expect(startingBalanceAccount2.sub(endingBalanceAccount2).eq(transferAmount));
  });
});
