import { Address, IEthereumService } from './ethereum-service';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { IHttpService } from './http-service';
import { IIpfsService } from './ipfs-service';
import { ITimingService } from './timing-service';
import { ITokenInfoUniswap, ITokenListUniswap, TokenAddressId } from './token-types';
import { TokenLists } from '../configurations/tokenLists';
import { callOnce } from '../decorators/call-once';

export type ITokenListService = TokenListService;
export const ITokenListService = DI.createInterface<ITokenListService>('TokenListService');

export class TokenListService {
  public tokenInfos?: Map<TokenAddressId, ITokenInfoUniswap>;
  constructor(
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IIpfsService private readonly ipfsService: IIpfsService,
    @IHttpService private readonly httpService: IHttpService,
    @ILogger private readonly logger: ILogger,
    @ITimingService private readonly timingService: ITimingService,
  ) {}

  public static register(container: IContainer): void {
    Registration.singleton(ITokenListService, TokenListService).register(container);
  }

  @callOnce('TokenListService')
  public async initialize(): Promise<void> {
    if (this.tokenInfos) return;

    const uris = this.ethereumService.targetedNetwork && TokenLists.get(this.ethereumService.targetedNetwork);

    if (!uris) {
      this.logger.fatal(`TokenListProvider: no tokenlists available for the network ${this.ethereumService.targetedNetwork ?? ''}`);
      return;
    }

    this.timingService.startTimer('fetch tokeninfos');
    const tokenInfoArrays = await Promise.all(uris.map((uri) => this.fetch(uri)));
    this.timingService.endTimer('fetch tokeninfos');

    this.tokenInfos = new Map(
      tokenInfoArrays
        .filter((y) => y?.length)
        .flatMap((tokenInfoArray) =>
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          tokenInfoArray!
            .filter((y) => y.chainId === this.ethereumService.targetedChainId)
            .map((tokenInfo) => [this.getTokenAddressId(tokenInfo.address, tokenInfo.id), tokenInfo]),
        ),
    );
  }

  public getTokenAddressId(address: Address, id?: number) {
    const lowerCaseAddress = address.toLowerCase();
    return typeof id === 'undefined' ? lowerCaseAddress : `${lowerCaseAddress}_${id}`;
  }

  /**
   * Returns promise of array of ITokenInfoUniswap from the given TokenInfo document uri or null
   * @param uri Uri to TokenInfo document
   * @returns Promise<ITokenInfoUniswap[] | null>
   */
  private fetch(uri: string): Promise<ITokenInfoUniswap[] | undefined> | undefined {
    if (!uri) {
      this.logger.error('Unable to fetch an empty URI');
      return;
    }

    const [protocol, path] = uri.split('://');

    if (uri.endsWith('.eth')) {
      return this.getByEns(uri);
    }

    if (protocol === 'https') {
      return this.httpService.call<ITokenListUniswap>(uri).then((data) => data.tokens);
    }

    if (protocol === 'ipns') {
      return this.ipfsService.getObjectFromHash<ITokenListUniswap>(path, protocol).then((result?: ITokenListUniswap) => result?.tokens);
    }

    this.logger.error(`Unhandled TokenList protocol: ${uri}`);
  }

  private async getByEns(ensName: string): Promise<ITokenInfoUniswap[] | undefined> {
    const resolver = await this.ethereumService.readOnlyProvider.getResolver(ensName);
    if (!resolver) {
      this.logger.error(`ens for TokenList not found: ${ensName}`);
      return;
    }
    const [, ipfsHash] = (await resolver.getContentHash()).split('://');
    const result = await this.ipfsService.getObjectFromHash<ITokenListUniswap>(ipfsHash);
    return result?.tokens;
  }
}
