import { DI, IContainer, Registration } from 'aurelia';

import { cache } from '../../decorators/cache';
import { IReadOnlyProvider } from '../../read-only-provider';
import { ICacheService } from '../cache-service';

import { IS_TESTING } from './../../environment-variables';
import type { ContractGroupsAbis, ContractGroupsJsons } from './contracts';
import { ContractGroupsSharedJson } from './types';

import { Signer } from '@ethersproject/abstract-signer';
import { BaseContract, Contract, ContractFunction, ContractInterface, PopulatedTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';

export type IContractService = ContractService;
export const IContractService = DI.createInterface<IContractService>();

/**
 * Provides ether.js Contract wrappers you can use to interact with smart contracts.
 * Provides support for "calling" methods on a given contract.
 * Provides support for generating transaction configuration information for methods on a given contract.
 * Uses the ABIs obtained from `getContractAbi` in contracts.ts.
 */
export class ContractService {
  constructor(@ICacheService private readonly cacheService: ICacheService, @IReadOnlyProvider private readonly readOnlyProvider: IReadOnlyProvider) {}

  public static register(container: IContainer) {
    Registration.singleton(IContractService, ContractService).register(container);
  }

  /**
   * get a Promise of a PopulatedTransaction that can be used to sign
   * and manually send transactions.
   * Uses the `populateTransaction` method supplied by ethers.js.
   *
   * @param contract
   * @param subFunctionName the name of the contract function
   * @param params
   * @returns
   */
  public callPopulateTransaction<
    T extends BaseContract,
    TFunction extends {
      [P in Extract<keyof T['populateTransaction'], string>]: keyof T['populateTransaction'][P] extends ContractFunction ? P : never;
    }[Extract<keyof T['populateTransaction'], string>],
  >(contract: T, subFunctionName: TFunction, ...params: Parameters<T['populateTransaction'][TFunction]>): Promise<PopulatedTransaction> {
    return contract.populateTransaction[subFunctionName].call(params);
  }

  @cache<ContractService>(function () {
    return { storage: this.cacheService };
  })
  public async getContract<TContractType extends ContractGroupsAbis, TResult extends BaseContract>(
    contractType: TContractType,
    name: Extract<keyof ContractGroupsJsons[TContractType]['main']['contracts'], string>,
    overrideAddress?: string,
    signerOrProvider?: BaseProvider | Signer,
  ): Promise<TResult> {
    const contractData = (
      IS_TESTING ? ((await import(`../../contracts/${contractType}/celo-test.json`)) as unknown) : ((await import(`../../contracts/${contractType}/celo.json`)) as unknown)
    ) as ContractGroupsJsons[TContractType]['main'];

    const contracts = contractData.contracts;
    const contract = contracts[name as keyof typeof contracts] as unknown as { abi: string | ContractInterface; address: string };
    let abi = contract.abi;
    if (typeof abi === 'string') {
      const key = abi as keyof ContractGroupsSharedJson;
      abi = (await this.getSharedAbi(contractType, key)) as ContractInterface;
    }

    overrideAddress = overrideAddress ?? contract.address;
    if (!overrideAddress) {
      throw new Error(`ContractService: requested contract has no address: ${name}`);
    }

    return new Contract(overrideAddress, abi, signerOrProvider ?? this.readOnlyProvider) as TResult;
  }

  public async getSharedAbi<TContractType extends ContractGroupsAbis>(contractType: TContractType, key: keyof ContractGroupsJsons[TContractType]['shared']) {
    const contractData = (await import(`../../contracts/${contractType}/sharedAbis.json`)) as ContractGroupsJsons[TContractType]['shared'];
    return contractData[key];
  }
}
