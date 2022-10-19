import { Address, IEthereumService } from './ethereum-service';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { DI, IContainer, Registration } from 'aurelia';
import { Erc20 } from 'models/generated/monetary/erc20';
import { Erc721 } from 'models/generated/monetary/erc721';
import { ICacheService } from './cache-service';
import { Provider } from '@ethersproject/providers';
import { Signer } from '@ethersproject/abstract-signer';
import { cache } from 'decorators/cache';
import { monetaryShared } from './contract/contracts';

export type ITokenService = TokenService;
export const ITokenService = DI.createInterface<ITokenService>();

export class TokenService {
  constructor(@ICacheService private readonly cacheService: ICacheService, @IEthereumService private readonly ethereumService: IEthereumService) {}

  public static register(container: IContainer) {
    Registration.singleton(ITokenService, TokenService).register(container);
  }

  /**
   * Caches the contracts based of the paramaters being passed
   * @param tokenAddress
   * @param id
   * @param signerOrProvider totally optional, by default is set to current signerOrProvider from EthereumService
   * @returns
   */
  public getTokenContract<T extends number | undefined>(
    tokenAddress: string,
    id?: T,
    signerOrProvider?: Provider | Signer | undefined,
  ): T extends undefined ? Erc20 : Erc721 | Erc20 {
    return this.getTokenContractCached(
      tokenAddress,
      id ? monetaryShared.ERC721 : monetaryShared.ERC20,
      signerOrProvider ?? this.ethereumService.createSignerOrProvider(),
    ) as T extends undefined ? Erc20 : Erc721 | Erc20;
  }

  @cache<TokenService>(function () {
    return { storage: this.cacheService };
  })
  private getTokenContractCached(tokenAddress: Address, abi: ContractInterface, signerOrProvider: Provider | Signer | undefined): Erc721 | Erc20 {
    return new Contract(tokenAddress, abi, signerOrProvider) as Erc721 | Erc20;
  }
}
