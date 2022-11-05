import { BaseContract, Contract, ContractFunction, ContractInterface, PopulatedTransaction } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { IS_CELO } from './../../environment-variables';
import { Signer } from '@ethersproject/abstract-signer';

import { ContractGroupsSharedJson } from './types';

import { Address, IEthereumService } from 'services/ethereum-service';
import { DI, IContainer, Registration } from 'aurelia';
import { ICacheService } from '../cache-service';
import { cache } from 'decorators/cache';
import type { ContractGroupsAbis, ContractGroupsJsons } from './contracts';

export type IContractService = ContractService;
export const IContractService = DI.createInterface<IContractService>();

/**
 * Provides ether.js Contract wrappers you can use to interact with smart contracts.
 * Provides support for "calling" methods on a given contract.
 * Provides support for generating transaction configuration information for methods on a given contract.
 * Uses the ABIs obtained from `getContractAbi` in contracts.ts.
 */
export class ContractService {
  constructor(@ICacheService private readonly cacheService: ICacheService, @IEthereumService private readonly ethereumService: IEthereumService) {}

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
   * @returns
   */
  public getContract<TContractType extends ContractGroupsAbis, TResult extends BaseContract>(
    contractType: TContractType,
    name: Extract<keyof ContractGroupsJsons[TContractType]['main']['contracts'], string>,
    overrideAddress?: string,
  ): Promise<TResult> {
    return this.getContractForAccount(this.ethereumService.defaultAccountAddress, contractType, name, overrideAddress);
  }

  public async getContractForProvider<TContractType extends ContractGroupsAbis, TResult extends BaseContract>(
    signerOrProvider: BaseProvider | Signer,
    contractType: TContractType,
    name: Extract<keyof ContractGroupsJsons[TContractType]['main']['contracts'], string>,
    overrideAddress?: string,
  ): Promise<TResult> {
    const contractData = (
      IS_CELO
        ? ((await import(`../../contracts/${contractType}/celo.json`)) as unknown)
        : ((await import(`../../contracts/${contractType}/alfajores.json`)) as unknown)
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

    return new Contract(overrideAddress, abi, signerOrProvider) as TResult;
  }

  public async getSharedAbi<TContractType extends ContractGroupsAbis>(
    contractType: TContractType,
    key: keyof ContractGroupsJsons[TContractType]['shared'],
  ) {
    const contractData = (
      IS_CELO
        ? ((await import(`../../contracts/${contractType}/sharedAbis.json`)) as unknown)
        : ((await import(`../../contracts/${contractType}/sharedAbis.json`)) as unknown)
    ) as ContractGroupsJsons[TContractType]['shared'];

    return contractData[key];
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
  private getContractForAccount<TContractType extends ContractGroupsAbis, TResult extends BaseContract>(
    account: Address | Signer | null,
    contractType: TContractType,
    name: Extract<keyof ContractGroupsJsons[TContractType]['main']['contracts'], string>,
    overrideAddress?: string,
  ): Promise<TResult> {
    const signerOrProvider = this.ethereumService.createSignerOrProviderForAddress(account);
    return this.getContractForProvider(signerOrProvider, contractType, name, overrideAddress);
  }
}
