import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import { ContractInterface, Signer } from 'ethers';

import { Shared } from './types';

import { ContractType, Contracts, monetaryShared } from './contracts';
import { DI, IContainer, Registration } from 'aurelia';
import { Erc20 } from 'models/generated/monetary/erc20';
import { Erc721 } from 'models/generated/monetary/erc721';
import { ICacheService } from '../cache-service';
import { cache } from 'decorators/cache';
import { defaultProvider } from '.';

export type IContractService = ContractService;
export const IContractService = DI.createInterface<IContractService>();

export class ContractService {
  constructor(@ICacheService private readonly cacheService: ICacheService) {}

  public static register(container: IContainer) {
    Registration.singleton(IContractService, ContractService).register(container);
  }

  @cache<ContractService>(function () {
    return { storage: this.cacheService };
  })
  public getContract<TContractType extends ContractType>(
    contractType: TContractType,
    name: Extract<keyof typeof Contracts[TContractType]['main']['contracts'], string>,
    overrideAddress?: string,
    signerOrProvider?: Provider | Signer | undefined,
  ) {
    const contractData = Contracts[contractType];
    const contracts = contractData.main.contracts;
    const contract = contracts[name as keyof typeof contracts] as unknown as { abi: string | ContractInterface; address: string };
    let abi = contract.abi;
    if (typeof abi === 'string') {
      const key = abi as keyof Shared;
      abi = contractData.shared[key] as ContractInterface;
    }
    return new Contract(overrideAddress ?? contract.address, contract.abi, signerOrProvider ?? defaultProvider);
  }

  @cache<ContractService>(function () {
    return { storage: this.cacheService };
  })
  public getTokenContract<T extends number | undefined = undefined>(
    tokenAddress: string,
    id?: T,
    signerOrProvider?: Provider | Signer | undefined,
  ): T extends number ? Erc721 : Erc20 {
    return new Contract(tokenAddress, id ? monetaryShared.ERC721 : monetaryShared.ERC20, signerOrProvider ?? defaultProvider) as T extends number
      ? Erc721
      : Erc20;
  }
}
