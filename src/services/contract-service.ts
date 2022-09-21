import { Contract } from '@ethersproject/contracts';
import { Erc20 } from 'models/generated/erc20/Erc20';
import { Erc721 } from 'models/generated/erc721';
import { ITokenInfo } from 'services/token-types';
import { Provider } from '@ethersproject/providers';

import { ContractInterface, Signer, getDefaultProvider } from 'ethers';

import { DI, IContainer, Registration } from 'aurelia';
import { ICacheService } from './cache-service';
import { ITokenListUniswap } from './token-types';
import { cache } from 'decorators/cache';
import governanceAlfajores from '../contracts/governance/alfajores.json';
import governanceCelo from '../contracts/governance/celo.json';
import governanceShared from '../contracts/governance/sharedAbis.json';
import monetaryAlfajores from '../contracts/monetary/alfajores.json';
import monetaryCelo from '../contracts/monetary/celo.json';
import monetaryShared from '../contracts/monetary/sharedAbis.json';

type MonetaryContractJson = typeof monetaryCelo | typeof monetaryAlfajores;
type GovernanceContractJson = typeof governanceCelo | typeof governanceAlfajores;
type Shared = typeof governanceShared | typeof monetaryShared;
type Contracts = GovernanceContractJson['contracts'] | MonetaryContractJson['contracts'];
export type MonetaryContracts = Extract<keyof MonetaryContractJson['contracts'], string>;
type GovernanceContracts = Extract<keyof GovernanceContractJson['contracts'], string>;

const endpoint = import.meta.env.KOL_NETWORK === 'Celo' ? 'https://celo.rpcs.dev:8545' : `https://alfajores.rpcs.dev:8545`;
export const defaultProvider = getDefaultProvider(endpoint);

export type IContractService = ContractService;
export const IContractService = DI.createInterface<IContractService>('ContractService');

const tokenListUri = 'https://cdn.jsdelivr.net/gh/Kolektivo/tokenlists@main/tokenlist.json';

export const tokenInfos =
  typeof window !== 'undefined'
    ? await fetch(tokenListUri, { method: 'GET', headers: { accept: 'application/json' } })
        .then(async (y) => (await y.json()) as ITokenListUniswap)
        .then((y) => y.tokens as ITokenInfo[])
    : [];

export class ContractService {
  constructor(@ICacheService private readonly cacheService: ICacheService) {}

  public static register(container: IContainer) {
    Registration.singleton(IContractService, ContractService).register(container);
  }

  public getMonetaryContract<T extends Contract>(
    contract: MonetaryContracts,
    overrideAddress?: string,
    signerOrProvider?: Provider | Signer | undefined,
  ): T {
    const contractJson = import.meta.env.KOL_NETWORK === 'Celo' ? monetaryCelo : monetaryAlfajores;
    return this.getLocalContract(contractJson.contracts, contract, monetaryShared, overrideAddress, signerOrProvider) as T;
  }

  public getGovernanceContract<T extends Contract>(
    contract: GovernanceContracts,
    overrideAddress?: string,
    signerOrProvider?: Provider | Signer | undefined,
  ): T {
    const contractJson = import.meta.env.KOL_NETWORK === 'Celo' ? governanceCelo : governanceAlfajores;
    return this.getLocalContract(contractJson.contracts, contract, governanceShared, overrideAddress, signerOrProvider) as T;
  }

  @cache<ContractService>(function () {
    return { storage: this.cacheService };
  })
  private getLocalContract<T extends Contracts>(
    contractJson: T,
    contractName: Extract<keyof T, string>,
    sharedAbis: Shared,
    overrideAddress?: string,
    signerOrProvider?: Provider | Signer | undefined,
  ): Contract {
    const contract = contractJson[contractName] as unknown as { abi: string | ContractInterface; address: string };
    let abi = contract.abi;
    if (typeof abi === 'string') {
      const key = abi as keyof Shared;
      abi = sharedAbis[key] as ContractInterface;
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
