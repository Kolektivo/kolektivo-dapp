import { Address, IEthereumService } from './ethereum-service';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { IIpfsService } from './ipfs-service';
import { ITimingService } from './timing-service';
import { ITokenInfoUniswap, ITokenListUniswap, TokenAddressId } from './token-types';
import { TokenLists } from '../configurations/tokenLists';
import { callOnce } from '../decorators/call-once';
import axios from 'axios';

export type ITokenListService = TokenListService;
export const ITokenListService = DI.createInterface<ITokenListService>('TokenListService');

export class TokenListService {
  constructor(
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IIpfsService private readonly ipfsService: IIpfsService,
    @ILogger private readonly logger: ILogger,
    @ITimingService private readonly timingService: ITimingService,
  ) {}

  public static register(container: IContainer): void {
    Registration.singleton(ITokenListService, TokenListService).register(container);
  }

  /**
   * address key is set to lowercase
   */
  public tokenInfos: Map<TokenAddressId, ITokenInfoUniswap> | undefined;

  /**
   * Hydrate this.tokenInfos from all configured TokenInfo documents for the current network.
   */
  @callOnce('TokenListService')
  public async initialize(): Promise<void> {
    if (typeof this.tokenInfos === 'undefined') {
      this.timingService.startTimer('fetch tokeninfos');
      if (!this.ethereumService.targetedNetwork) {
        throw new Error(`TokenListService: no tokenlists available for the empty network`);
      }
      const uris = TokenLists.get(this.ethereumService.targetedNetwork);
      if (!uris) {
        throw new Error(`TokenListProvider: no tokenlists available for the network ${this.ethereumService.targetedNetwork}`);
      }
      /**
       * get an array of promised ITokenInfoUniswap arrays, excluding any that are null or empty
       */
      const tokenInfoArrays = (await Promise.all(uris.map((uri) => this.fetch(uri)))).filter(
        (tokenInfoArray) => tokenInfoArray?.length,
      ) as ITokenInfoUniswap[][];
      /**
       * compile lists into a single map, filtering the tokeninfos by targetted network.
       * Address key is set to lowercase.
       */
      const tokenInfoMap = new Map<Address, ITokenInfoUniswap>();
      for (const tokenInfoArray of tokenInfoArrays) {
        for (const tokenInfo of tokenInfoArray) {
          if (tokenInfo.chainId === this.ethereumService.targetedChainId) {
            tokenInfoMap.set(tokenInfo.address.toLowerCase(), tokenInfo);
          }
        }
      }
      // if (tokenInfoMap.size === 0) {
      //   throw new Error('Failed to load any TokenInfos');
      // }
      this.timingService.endTimer('fetch tokeninfos');
      this.tokenInfos = tokenInfoMap;
    }
  }

  /**
   * Returns promise of array of ITokenInfoUniswap from the given TokenInfo document uri or null
   * @param uri Uri to TokenInfo document
   * @returns Promise<ITokenInfoUniswap[] | null>
   */
  private fetch(uri: string): Promise<ITokenInfoUniswap[] | null> {
    let list: Promise<ITokenInfoUniswap[] | null> = Promise.resolve(null);

    if (uri) {
      const [protocol, path] = uri.split('://');

      if (uri.endsWith('.eth')) {
        list = this.getByEns(uri);
      } else if (protocol === 'https') {
        list = axios.get<ITokenListUniswap>(uri).then((result: { data?: ITokenListUniswap }) => result.data?.tokens ?? null);
      } else if (protocol === 'ipns') {
        list = this.ipfsService
          .getObjectFromHash<ITokenListUniswap>(path, protocol)
          .then((result: ITokenListUniswap | null) => result?.tokens ?? null);
      } else {
        this.logger.error(`Unhandled TokenList protocol: ${uri}`);
      }
    } else {
      this.logger.error(`No TokenList uri`);
    }

    return list.catch((e) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
      this.logger.error(`Failed to load TokenList: ${uri}, ${e?.message}`);
      return null;
    });
  }

  private async getByEns(ensName: string): Promise<ITokenInfoUniswap[] | null> {
    const resolver = await this.ethereumService.readOnlyProvider.getResolver(ensName);
    if (resolver) {
      const [, ipfsHash] = (await resolver.getContentHash()).split('://');
      return this.ipfsService.getObjectFromHash<ITokenListUniswap>(ipfsHash).then((result: ITokenListUniswap | null) => result?.tokens ?? null);
    } else {
      throw new Error(`ens for TokenList not found: ${ensName}`);
    }
  }
}
