import { Contract } from 'ethers';
import { Provider } from '@ethersproject/providers/lib';
import { Signer } from '@ethersproject/abstract-signer';
// eslint-disable-next-line no-duplicate-imports
import type { BaseContract, ContractFunction, ContractInterface, PopulatedTransaction } from 'ethers';

import { ContractGroupsSharedJson } from './types';

import { ContractGroupsAbis, ContractGroupsJsons } from './contracts';
import { DI, IContainer, Registration } from 'aurelia';
import { ICacheService } from '../cache-service';
import { IReadOnlyProvider } from '../../read-only-provider';
import { cache } from 'decorators/cache';

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

  /**
   * Get the ethers.js Contract wrapper for a given contract.
   *
   * Examples:
   *
   *  const kCurContract = this.contractService.getContract('Monetary', 'Kolektivo Curacao Token');
   *
   *  // for when you need to specify a specific instance of a contract
   *  const kCurContract = this.contractService.getContract('Monetary', 'Kolektivo Curacao Token', "0x1234...");
   *
   *  // for when you need to send transactions
   *  const kCurContract = this.contractService.getContract('Monetary', 'Kolektivo Curacao Token', undefined, signer);
   *
   * @param contractType
   * @param name
   * @param overrideAddress
   * @param signerOrProvider totally optional, by default is set to current signerOrProvider from EthereumService
   * @returns
   */
  public getContract<TResult extends BaseContract, TContractType extends ContractGroupsAbis = ContractGroupsAbis>(
    contractType: TContractType,
    name: Extract<keyof typeof ContractGroupsJsons[TContractType]['main']['contracts'], string>,
    overrideAddress?: string,
    signerOrProvider?: Provider | Signer | undefined,
  ): TResult {
    const contractData = ContractGroupsJsons[contractType];
    const contracts = contractData.main.contracts;
    const contract = contracts[name as keyof typeof contracts] as unknown as { abi: string | ContractInterface; address: string };
    let abi = contract.abi;
    if (typeof abi === 'string') {
      const key = abi as keyof ContractGroupsSharedJson;
      abi = contractData.shared[key] as ContractInterface;
    }
    overrideAddress = overrideAddress ?? contract.address;
    if (!overrideAddress) {
      throw new Error(`ContractService: requested contract has no address: ${name}`);
    }
    return this.getContractCached(overrideAddress, abi, signerOrProvider ?? this.readOnlyProvider);
  }

  /**
   * The cache restricts this from being invoked unless it has new input parameters.
   * It is important that the consumer of this method not keep their own cache of these contracts,
   * the reason being that the contract wrappers will not work properly if the current account or
   * web3 provider has changed.  So the method must be called afresh whenever used, if it is possible
   * that the input params could have changed.
   * @param contractType
   * @param name
   * @param address
   * @param signerOrProvider
   * @returns
   */
  @cache<ContractService>(function () {
    return { storage: this.cacheService };
  })
  private getContractCached<TResult extends BaseContract>(address: string, abi: ContractInterface, signerOrProvider: Provider | Signer): TResult {
    return new Contract(address, abi, signerOrProvider) as TResult;
  }
}
