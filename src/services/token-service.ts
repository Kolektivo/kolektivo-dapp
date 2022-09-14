import { Address, IEthereumService, Networks } from './ethereum-service';
import { Contract } from 'ethers';
import { ContractNames, IContractsService } from './contracts-service';
import { DI, IContainer, ILogger, IPlatform, Registration, TaskQueue } from 'aurelia';
import { Erc20 as Erc20Type } from 'models/generated/erc20/Erc20';
import { Erc721 as Erc721Type } from 'models/generated/erc721/Erc721';
import { FormatTypes, Interface, getAddress } from 'ethers/lib/utils';
import { IHttpService } from './http-service';
import { ITimingService } from './timing-service';
import { ITokenInfo, TokenAddressId } from './token-types';
import { ITokenListService } from './token-list-service';
import { callOnce } from 'decorators/call-once';
import { getErrorMessage } from 'utils';

// don't need coingecko for now or ever
// interface ICoingeckoTokenInfo {
//   id?: string;
//   name: string;
//   symbol: string;
// }

export type ITokenService = TokenService;
export const ITokenService = DI.createInterface<ITokenService>('TokenService');

export class TokenService {
  private readonly DefaultLogoURI = '/genericToken.svg';
  private readonly DefaultNameSymbol = 'N/A';
  private readonly DefaultDecimals = 0;
  private erc20Abi = [];
  private erc721Abi = [];

  private tokenInfos!: Map<TokenAddressId, ITokenInfo>;
  private queue: TaskQueue;
  // don't need coingecko for now or ever
  // private geckoCoinInfo = new Map<string, string>();

  public static register(container: IContainer): void {
    container.register(Registration.singleton(ITokenService, TokenService));
  }

  constructor(
    @IContractsService private readonly contractsService: IContractsService,
    @ITokenListService private readonly tokenListProvider: ITokenListService,
    @IEthereumService private readonly ethereumService: IEthereumService,
    @ITimingService private readonly timingService: ITimingService,
    @IHttpService private readonly httpService: IHttpService,
    @ILogger private readonly logger: ILogger,
    @IPlatform private readonly platform: IPlatform,
  ) {
    this.logger = logger.scopeTo('TokenService');
    this.queue = platform.taskQueue;
  }

  @callOnce('TokenService')
  public initialize(): void {
    try {
      this.erc20Abi = this.contractsService.getContractAbi(ContractNames.ERC20);
      this.erc721Abi = this.contractsService.getContractAbi(ContractNames.ERC721);

      void this.tokenListProvider.initialize().then(() => {
        /**
         * note these will not automatically have id or price initialized
         */
        this.tokenInfos = this.tokenListProvider.tokenInfos as Map<TokenAddressId, ITokenInfo>;
      });

      // don't need coingecko for now or ever
      // const uri = `https://pro-api.coingecko.com/api/v3/coins/list?x_cg_pro_api_key=${COINGECKO_API_KEY}`;
      // this.timingService.startTimer('get geckoCoinInfo');
      // /**
      //  * prefetch all coingecko ids to use for fetching token prices, etc later
      //  */
      // const response = await axios.get<[]>(uri);
      // // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      // if (response.data.length) {
      //   response.data.map((coidTokenInfo: ICoingeckoTokenInfo) =>
      //     this.geckoCoinInfo.set(this.getTokenGeckoMapKey(coidTokenInfo.name, coidTokenInfo.symbol), coidTokenInfo.id ?? ''),
      //   );
      // }
      // this.timingService.endTimer('get geckoCoinInfo');
    } catch {
      this.logger.error('There was an error fetching token data');
    }
  }

  /**
   * For a list of tokens, efficiently hydrate tokenInfo price from coingecko.
   * Does not hydrate logoURI.  Overrides pre-existing prices.
   * @param tokenInfos
   */
  // don't need coingecko for now or ever
  // public async getTokenPrices(tokenInfos: ITokenInfo[]): Promise<void> {
  //   this.timingService.startTimer('getTokenPrices');

  //   const tokensByGeckoId = new Map<string, ITokenInfo>();

  //   tokenInfos.forEach((tokenInfo) => {
  //     const coinGeckoId = this.getTokenGeckoId(tokenInfo.name, tokenInfo.symbol);
  //     if (coinGeckoId) {
  //       tokensByGeckoId.set(coinGeckoId, tokenInfo);
  //     }
  //   });

  //   if (tokensByGeckoId.size) {
  //     const uri = `https://pro-api.coingecko.com/api/v3/simple/price?vs_currencies=USD%2CUSD&ids=${Array.from(tokensByGeckoId.keys()).join(
  //       ',',
  //     )}&x_cg_pro_api_key=${COINGECKO_API_KEY}`;

  //     await axios
  //       .get<Record<string, { usd: number }>>(uri)
  //       .then((response) => {
  //         const keys = Object.keys(response.data);
  //         const keyCount = keys.length;
  //         for (let i = 0; i < keyCount; ++i) {
  //           const coingGeckoId = keys[i];
  //           const tokenInfo = tokensByGeckoId.get(coingGeckoId);
  //           if (tokenInfo) {
  //             tokenInfo.price = response.data[coingGeckoId].usd;
  //           }
  //         }
  //       })
  //       .catch((error) => {
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //         this.logger.error(`PriceService: Error fetching token price ${this.axiosService.axiosErrorHandler(error)}`);
  //       });
  //   }

  //   this.timingService.endTimer('getTokenPrices');
  // }

  /**
   * Returns promise of ITokenInfo given address and optional NTF id.
   * @param tokenAddress
   * @param id Just for NFTs
   * @returns
   */
  public getTokenInfoFromAddress(tokenAddress: Address, id?: number): Promise<ITokenInfo | undefined> {
    /**
     * Fetch tokens one-at-a-time because many requests will be redundant, we want them
     * to take advantage of caching, and we don't want to re-enter on fetching duplicate tokens.
     */
    return this.queue.queueTask(() => this._getTokenInfoFromAddress(tokenAddress, id), {
      suspend: true,
    }).result;
  }

  /**
   * Return the appropriate contract for the given token
   * @param tokenAddress
   * @param id This is undefined for Erc20 tokens, defined but otherwise ignored for Erc721 tokens
   * @returns
   */
  public getTokenContract(tokenAddress: Address, id?: number): Erc20Type | Erc721Type {
    let ercAbi = [];
    if (this.isNftId(id)) {
      ercAbi = this.erc721Abi;
    } else {
      ercAbi = this.erc20Abi;
    }
    return new Contract(tokenAddress, ercAbi, this.contractsService.createProvider()) as Erc20Type | Erc721Type;
  }

  /**
   * Hydrate tokenInfo with the USD price from coingecko.  As a side-effect, if the token has no logoURI, then will
   * also hydrate that.
   * @param tokenInfo
   * @returns Promise of the hydrated ITokenInfo
   */
  // don't need coingecko for now or ever
  // public hydratePrice(tokenInfo: ITokenInfo): Promise<ITokenInfo> {
  //   const tokenInfoId = this.getTokenGeckoId(tokenInfo.name, tokenInfo.symbol);

  //   if (tokenInfoId) {
  //     // else is not in coingecko
  //     const uri = `https://pro-api.coingecko.com/api/v3/coins/${tokenInfoId}?market_data=true&localization=false&community_data=false&developer_data=false&sparkline=false&x_cg_pro_api_key=${COINGECKO_API_KEY}`;

  //     return axios
  //       .get<{ market_data: { current_price: { usd?: number } }; image: { thumb: string } }>(uri)
  //       .then((response) => {
  //         tokenInfo.price = response.data.market_data.current_price.usd ?? 0;
  //         // tokenInfo.priceChangePercentage_24h = response.data.market_data.price_change_percentage_24h ?? 0;
  //         if (!tokenInfo.logoURI || tokenInfo.logoURI === this.DefaultLogoURI) {
  //           tokenInfo.logoURI = response.data.image.thumb;
  //         }
  //         return tokenInfo;
  //       })
  //       .catch((ex) => {
  //         // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  //         this.logger.error(`PriceService: Error fetching token price ${this.axiosService.axiosErrorHandler(ex)}`);
  //         return tokenInfo;
  //       });
  //   } else {
  //     return Promise.resolve(tokenInfo);
  //   }
  // }

  public async isRequiredTokenContract(tokenAddress: Address, id?: number): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const timerLabel = `isRequiredTokenContract-${tokenAddress}${this.isNftId(id) ? `-${id!}` : ''}`;

    this.timingService.startTimer(timerLabel);
    const contract = this.getTokenContract(tokenAddress, id) as Partial<Erc721Type> | Partial<Erc20Type>;
    try {
      await contract.deployed?.();
    } catch {
      return false;
    }

    let isOk = true;

    try {
      if (this.ethereumService.targetedNetwork === Networks.Celo) {
        const proxyImplementation = await this.contractsService.getProxyImplementation(tokenAddress);
        if (proxyImplementation) {
          tokenAddress = proxyImplementation;
        }

        const contractAbi = await this.httpService
          .call<{ message: string; result: string }>(`https://explorer.celo.org/api?module=contract&action=getabi&address=${tokenAddress}`)
          .then((result) => {
            return result.message !== 'OK' ? null : result.result;
          });

        if (!contractAbi) {
          throw new Error('ABI not obtainable, contract may not be verified');
        }

        const contractInterface = new Interface(contractAbi);
        const ercInterface = new Interface(this.isNftId(id) ? this.erc721Abi : this.erc20Abi);

        for (const functionName in ercInterface.functions) {
          const contractFunction = contractInterface.functions[functionName];
          if (
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            !contractFunction ||
            contractFunction.format(FormatTypes.minimal) !== ercInterface.functions[functionName].format(FormatTypes.minimal)
          ) {
            isOk = false;
            this.logger.error(
              `isRequiredTokenContract: Token ${tokenAddress}${
                typeof id === 'undefined' ? '' : `-${id}`
              } fails to implement function: ${functionName}`,
            );
            break;
          }
        }
        if (isOk) {
          for (const eventName in ercInterface.events) {
            const contractEvent = contractInterface.events[eventName];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!contractEvent || contractEvent.format(FormatTypes.minimal) !== ercInterface.events[eventName].format(FormatTypes.minimal)) {
              isOk = false;
              this.logger.error(
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                `isRequiredTokenContract: Token ${tokenAddress}${this.isNftId(id) ? `-${id!}` : ''} fails to implement event: ${eventName}`,
              );
              break;
            }
          }
        }
      } else {
        // a testnet, just do this
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await contract.name?.();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
      this.logger.error(`isRequiredTokenContract: Error confirming token: ${error?.response?.data?.error?.message ?? error?.message}`);
      isOk = false;
    }

    this.timingService.endTimer(timerLabel);

    return isOk;
  }

  private getTokenGeckoMapKey(name: string, symbol: string): string {
    // PRIMEDao Token HACK!!!
    if (name.toLowerCase() === 'primedao token') {
      name = 'primedao';
    }
    if (name.toLowerCase() === 'dai stablecoin') {
      name = 'dai';
    }
    if (name.toLowerCase() === 'dstoken') {
      name = 'dai';
    } // kovan
    if (name.toLowerCase() === 'wrapped ether') {
      name = 'weth';
    }
    return `${name.toLowerCase()}_${symbol.toLowerCase()}`;
  }

  // don't need coingecko for now or ever
  // private getTokenGeckoId(name: string, symbol: string): string {
  //   const id = this.geckoCoinInfo.get(this.getTokenGeckoMapKey(name, symbol));
  //   if (id) {
  //     return id;
  //   } else {
  //     this.logger.warn(`TokenService: Unable to find token info in CoinGecko: (${name}/${symbol})`);
  //     return '';
  //   }
  // }

  /**
   * Returns promise of a tokenInfo if the metadata is found in the tokenLists or
   * a valid token contract is found.
   *
   * If there is an error, then throws an exception.
   */
  private async _getTokenInfoFromAddress(tokenAddress: Address, id?: number) {
    const tokenAddressId = this.getTokenAddressId(tokenAddress, id);
    const foundTokenInfo = this.tokenInfos.get(tokenAddressId);
    if (foundTokenInfo) return foundTokenInfo;

    tokenAddress = getAddress(tokenAddress);

    if (!tokenAddress) {
      throw new Error(`Invalid token address: ${tokenAddress}`);
    }

    /**
     * fetchTokenMetadata will throw an exception if it can't at least find a contract at the
     * given address.  Otherwise it may return an incomplete tokenInfo.
     */
    const tokenInfo = await this.getTokenInfoOnChain(tokenAddress, id);
    if (!tokenInfo) {
      // is not a valid token contract, or some other error occurred
      throw new Error(`Token does not appear to be a token contract: ${tokenAddress}`);
    }

    tokenInfo.name ||= this.DefaultNameSymbol;
    tokenInfo.symbol ||= this.DefaultNameSymbol;
    // NFTs have no decimals, always effectively 1
    tokenInfo.decimals ||= this.isNftId(id) ? 1 : this.DefaultDecimals;
    tokenInfo.logoURI ||= this.DefaultLogoURI;

    this.tokenInfos.set(tokenAddressId, tokenInfo as ITokenInfo);
    this.logger.info(`loaded token: ${tokenAddress}`);
  }

  private getTokenAddressId(address: Address, id?: number) {
    const lowerCaseAddress = address.toLowerCase();
    return typeof id === 'undefined' ? lowerCaseAddress : `${lowerCaseAddress}_${id}`;
  }

  private async getTokenInfoOnChain(address: string, id?: number): Promise<undefined | Partial<ITokenInfo>> {
    try {
      const tokenContract = this.getTokenContract(address, id) as Partial<Erc721Type> | Partial<Erc20Type>;
      await tokenContract.deployed?.();
      const tokenInfo: Partial<ITokenInfo> = { address };
      tokenInfo.logoURI = undefined;

      tokenInfo.name = await tokenContract.name?.();
      tokenInfo.symbol = await tokenContract.symbol?.();
      tokenInfo.decimals = this.isNftId(id) ? 1 : await (tokenContract as Partial<Erc20Type>).decimals?.();
      return tokenInfo;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      this.logger.error(`Failed to fetch onchain token metadata: ${getErrorMessage(error)}`);
    }
  }

  private isNftId(id?: number): boolean {
    return typeof id !== 'undefined';
  }
}
