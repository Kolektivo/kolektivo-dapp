import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import { BaseContract, ContractFunction, ContractInterface, Signer } from 'ethers';

import { Shared } from './types';

import { ContractType, Contracts, monetaryShared } from './contracts';
import { DI, IContainer, Registration } from 'aurelia';
import { Erc20 } from 'models/generated/monetary/erc20';
import { Erc721 } from 'models/generated/monetary/erc721';
import { ICacheService } from '../cache-service';
import { IReadOnlyProvider } from 'provider';
import { cache } from 'decorators/cache';

export type IContractService = ContractService;
export const IContractService = DI.createInterface<IContractService>();

export class ContractService {
  constructor(@ICacheService private readonly cacheService: ICacheService, @IReadOnlyProvider private readonly readonlyProvider: IReadOnlyProvider) {}

  public static register(container: IContainer) {
    Registration.singleton(IContractService, ContractService).register(container);
  }

  @cache<ContractService>(function () {
    return { storage: this.cacheService };
  })
  public getContract<TContractType extends ContractType, TResult extends BaseContract = Erc20>(
    contractType: TContractType,
    name: Extract<keyof typeof Contracts[TContractType]['main']['contracts'], string>,
    overrideAddress?: string,
    signerOrProvider?: Provider | Signer | undefined,
  ): TResult {
    const contractData = Contracts[contractType];
    const contracts = contractData.main.contracts;
    const contract = contracts[name as keyof typeof contracts] as unknown as { abi: string | ContractInterface; address: string };
    let abi = contract.abi;
    if (typeof abi === 'string') {
      const key = abi as keyof Shared;
      abi = contractData.shared[key] as ContractInterface;
    }
    return new Contract(overrideAddress ?? contract.address, abi, signerOrProvider ?? this.readonlyProvider) as TResult;
  }

  private async callContractMethod<
    T extends BaseContract,
    TFunction extends {
      [P in Extract<keyof T[TKey], string>]: keyof T[TKey][P] extends ContractFunction ? P : never;
    }[Extract<keyof T[TKey], string>],
    TKey extends 'populateTransaction' | 'functions',
  >(contract: T, functionName: TKey, subFunctionName: TFunction, ...params: Parameters<T[TKey][TFunction]>) {
    return (await contract[functionName][subFunctionName].call(params)) as ReturnType<T[TKey][TFunction]>;
  }

  public callPopulateTransaction<
    T extends BaseContract,
    TFunction extends {
      [P in Extract<keyof T['populateTransaction'], string>]: keyof T['populateTransaction'][P] extends ContractFunction ? P : never;
    }[Extract<keyof T['populateTransaction'], string>],
  >(contract: T, subFunctionName: TFunction, ...params: Parameters<T['populateTransaction'][TFunction]>) {
    return this.callContractMethod(contract, 'populateTransaction', subFunctionName, ...params);
  }

  public callContractFunction<
    T extends BaseContract,
    TFunction extends {
      [P in Extract<keyof T['functions'], string>]: keyof T['functions'][P] extends ContractFunction ? P : never;
    }[Extract<keyof T['functions'], string>],
  >(contract: T, subFunctionName: TFunction, ...params: Parameters<T['functions'][TFunction]>) {
    return this.callContractMethod(contract, 'functions', subFunctionName, ...params);
  }

  /**
   * Caches the contracts based of the paramaters being passed
   * @param tokenAddress
   * @param id
   * @param signerOrProvider
   * @returns
   */
  @cache<ContractService>(function () {
    return { storage: this.cacheService };
  })
  public getTokenContract<T extends number>(
    tokenAddress: string,
    id?: T,
    signerOrProvider?: Provider | Signer | undefined,
  ): T extends undefined ? Erc20 : Erc721 | Erc20 {
    return new Contract(
      tokenAddress,
      id ? monetaryShared.ERC721 : monetaryShared.ERC20,
      signerOrProvider ?? this.readonlyProvider,
    ) as T extends undefined ? Erc20 : Erc721 | Erc20;
  }
}
