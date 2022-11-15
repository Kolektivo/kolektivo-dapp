import { DI, IContainer, Registration } from 'aurelia';

import { ICacheService } from './cache-service';
import { IContractService } from './contract';

import { Signer } from '@ethersproject/abstract-signer';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { BaseProvider } from '@ethersproject/providers';
import { cache } from 'decorators/cache';
import { Erc20 } from 'models/generated/monetary/erc20/Erc20';
import { Erc721 } from 'models/generated/monetary/erc721/Erc721';
import { IReadOnlyProvider } from 'read-only-provider';

export type ITokenService = TokenService;
export const ITokenService = DI.createInterface<ITokenService>();

export class TokenService {
  constructor(
    @ICacheService private readonly cacheService: ICacheService,
    @IContractService private readonly contractService: IContractService,
    @IReadOnlyProvider private readonly readonlyProvider: IReadOnlyProvider,
  ) {}

  public static register(container: IContainer) {
    Registration.singleton(ITokenService, TokenService).register(container);
  }

  @cache<TokenService>(function () {
    return { storage: this.cacheService };
  })
  public async getTokenContract<T extends number | undefined>(
    tokenAddress: string,
    id?: T,
    signerOrProvider?: BaseProvider | Signer,
  ): Promise<T extends undefined ? Erc20 : Erc721> {
    const abi: ContractInterface = !id
      ? await this.contractService.getSharedAbi('monetary', 'ERC20')
      : await this.contractService.getSharedAbi('monetary', 'ERC721');

    return new Contract(tokenAddress, abi, signerOrProvider ?? this.readonlyProvider) as T extends undefined ? Erc20 : Erc721;
  }
}
