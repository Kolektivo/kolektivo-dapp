import { type Address } from 'services/ethereum-service';
import { BaseProvider } from '@ethersproject/providers';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { DI, IContainer, Registration } from 'aurelia';
import { Erc20 } from 'models/generated/monetary/erc20/Erc20';
import { Erc721 } from 'models/generated/monetary/erc721/Erc721';
import { ICacheService } from './cache-service';
import { IContractService } from './contract';
import { IEthereumService } from './ethereum-service';
import { Signer } from '@ethersproject/abstract-signer';
import { cache } from 'decorators/cache';

export type ITokenService = TokenService;
export const ITokenService = DI.createInterface<ITokenService>();

export class TokenService {
  constructor(
    @ICacheService private readonly cacheService: ICacheService,
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IContractService private readonly contractService: IContractService,
  ) {}

  public static register(container: IContainer) {
    Registration.singleton(ITokenService, TokenService).register(container);
  }

  public async getTokenContract<T extends number | undefined>(tokenAddress: string, id?: T): Promise<T extends undefined ? Erc20 : Erc721 | Erc20> {
    return this.getTokenContractForAccount(this.ethereumService.defaultAccountAddress, tokenAddress, id);
  }

  public async getTokenContractForProvider<T extends number | undefined>(
    signerOrProvider: BaseProvider | Signer,
    tokenAddress: Address,
    id?: T,
  ): Promise<T extends undefined ? Erc20 : Erc721> {
    const abi: ContractInterface = !id
      ? await this.contractService.getSharedAbi('monetary', 'ERC20')
      : await this.contractService.getSharedAbi('monetary', 'ERC721');

    return new Contract(tokenAddress, abi, signerOrProvider) as T extends undefined ? Erc20 : Erc721;
  }

  /**
   * Caches the contracts based of the paramaters being passed
   * @param tokenAddress
   * @param id
   * @param signerOrProvider totally optional, by default is set to current signerOrProvider from EthereumService
   * @returns
   */
  @cache<TokenService>(function () {
    return { storage: this.cacheService };
  })
  private getTokenContractForAccount<T extends number | undefined>(
    account: Address | Signer | null,
    tokenAddress: Address,
    id?: T,
  ): Promise<T extends undefined ? Erc20 : Erc721 | Erc20> {
    const signerOrProvider = this.ethereumService.createSignerOrProviderForAddress(account);
    return this.getTokenContractForProvider(signerOrProvider, tokenAddress, id);
  }
}
