import { Address, IEthereumService, Networks } from './ethereum-service';
import { COINGECKO_API_KEY, ETHERSCAN_KEY } from '../environment-variables';
import { Contract, ethers } from 'ethers';
import { ContractNames, IContractsService } from './contracts-service';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { FormatTypes, Interface, getAddress } from 'ethers/lib/utils';
import { IAxiosService } from './axios-service';
import { IErc20Token, IErc721Token, ITokenInfo, TokenAddressId } from './token-types';
import { ITimingService } from './timing-service';
import { ITokenListService } from './token-list-service';
import { Subject, from } from 'rxjs';
import { callOnce } from '../decorators/call-once';
import { concatMap } from 'rxjs/operators';
import axios from 'axios';

interface ICoingeckoTokenInfo {
  id?: string;
  name: string;
  symbol: string;
}

export type ITokenService = TokenService;
export const ITokenService = DI.createInterface<ITokenService>('TokenService');

export class TokenService {
  public static DefaultLogoURI = '/genericToken.svg';
  public static DefaultNameSymbol = 'N/A';
  public static DefaultDecimals = 0;
  private erc20Abi = [];
  private erc721Abi = [];

  private tokenInfos!: Map<TokenAddressId, ITokenInfo>;
  private queue: Subject<() => Promise<void>>;
  // public tokenLists: TokenListMap;
  // private tokenPrices: Map<Address, number>;
  private geckoCoinInfo = new Map<string, string>();

  public static register(container: IContainer): void {
    container.register(Registration.singleton(ITokenService, TokenService));
  }

  constructor(
    @IContractsService private readonly contractsService: IContractsService,
    @ITokenListService private readonly tokenListProvider: ITokenListService,
    @IEthereumService private readonly ethereumService: IEthereumService,
    @ITimingService private readonly timingService: ITimingService,
    @IAxiosService private readonly axiosService: IAxiosService,
    @ILogger private readonly logger: ILogger,
  ) {
    this.logger = logger.scopeTo('TokenService');
    this.queue = new Subject<() => Promise<void>>();
    // this.tokenPrices = new Map<Address, number>();

    // this will initiate the execution of the promises
    // each promise is executed after the previous one has resolved
    this.queue
      .pipe(
        concatMap((resolver: () => Promise<void>) => {
          return from(resolver());
        }),
      )
      .subscribe();
  }

  @callOnce('TokenService')
  public async initialize(): Promise<void> {
    try {
      this.erc20Abi = this.contractsService.getContractAbi(ContractNames.ERC20);
      this.erc721Abi = this.contractsService.getContractAbi(ContractNames.ERC721);

      // void this.tokenListProvider.initialize().then(() => {
      //   /**
      //    * note these will not automatically have id or price initialized
      //    */
      //   this.tokenInfos = this.tokenListProvider.tokenInfos as Map<TokenAddressId, ITokenInfo>;
      // });

      const uri = `https://pro-api.coingecko.com/api/v3/coins/list?x_cg_pro_api_key=${COINGECKO_API_KEY}`;
      this.timingService.startTimer('get geckoCoinInfo');
      /**
       * prefetch all coingecko ids to use for fetching token prices, etc later
       */
      const response = await axios.get<[]>(uri);
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (response.data.length) {
        response.data.map((coidTokenInfo: ICoingeckoTokenInfo) =>
          this.geckoCoinInfo.set(this.getTokenGeckoMapKey(coidTokenInfo.name, coidTokenInfo.symbol), coidTokenInfo.id ?? ''),
        );
      }
      this.timingService.endTimer('get geckoCoinInfo');
    } catch {
      console.error('There was an error fetching token data');
    }
  }

  /**
   * For a list of tokens, efficiently hydrate tokenInfo price from coingecko.
   * Does not hydrate logoURI.  Overrides pre-existing prices.
   * @param tokenInfos
   */
  public async getTokenPrices(tokenInfos: ITokenInfo[]): Promise<void> {
    this.timingService.startTimer('getTokenPrices');

    const tokensByGeckoId = new Map<string, ITokenInfo>();

    tokenInfos.forEach((tokenInfo) => {
      const coinGeckoId = this.getTokenGeckoId(tokenInfo.name, tokenInfo.symbol);
      if (coinGeckoId) {
        tokensByGeckoId.set(coinGeckoId, tokenInfo);
      }
    });

    if (tokensByGeckoId.size) {
      const uri = `https://pro-api.coingecko.com/api/v3/simple/price?vs_currencies=USD%2CUSD&ids=${Array.from(tokensByGeckoId.keys()).join(
        ',',
      )}&x_cg_pro_api_key=${COINGECKO_API_KEY}`;

      await axios
        .get<Record<string, { usd: number }>>(uri)
        .then((response) => {
          const keys = Object.keys(response.data);
          const keyCount = keys.length;
          for (let i = 0; i < keyCount; ++i) {
            const coingGeckoId = keys[i];
            const tokenInfo = tokensByGeckoId.get(coingGeckoId);
            if (tokenInfo) {
              tokenInfo.price = response.data[coingGeckoId].usd;
            }
          }
        })
        .catch((error) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          this.logger.error(`PriceService: Error fetching token price ${this.axiosService.axiosErrorHandler(error)}`);
        });
    }

    this.timingService.endTimer('getTokenPrices');
  }

  /**
   * Returns promise of ITokenInfo given address and optional NTF id.
   * @param tokenAddress
   * @param id Just for NFTs
   * @returns
   */
  public async getTokenInfoFromAddress(tokenAddress: Address, id?: number): Promise<ITokenInfo> {
    let resolver: (value: ITokenInfo | PromiseLike<ITokenInfo>) => void;
    let rejector: (reason?: unknown) => void;

    const promise = new Promise<ITokenInfo>(
      (resolve: (value: ITokenInfo | PromiseLike<ITokenInfo>) => void, reject: (reason?: unknown) => void): void => {
        resolver = resolve;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rejector = (reason?: any) => {
          this.logger.error(reason);
          reject(reason);
        };
      },
    );

    /**
     * Fetch tokens one-at-a-time because many requests will be redundant, we want them
     * to take advantage of caching, and we don't want to re-enter on fetching duplicate tokens.
     */
    this.queue.next(() => this._getTokenInfoFromAddress(tokenAddress, resolver, rejector, id));

    return promise;
  }

  /**
   * Return the appropriate contract for the given token
   * @param tokenAddress
   * @param id This is undefined for Erc20 tokens, defined but otherwise ignored for Erc721 tokens
   * @returns
   */
  public getTokenContract(tokenAddress: Address, id?: number): (Contract & IErc20Token) | (Contract & IErc721Token) {
    let ercAbi = [];
    if (this.isNftId(id)) {
      ercAbi = this.erc721Abi;
    } else {
      ercAbi = this.erc20Abi;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new ethers.Contract(tokenAddress, ercAbi, this.contractsService.createProvider())! as Contract & IErc20Token;
  }

  /**
   * Hydrate tokenInfo with the USD price from coingecko.  As a side-effect, if the token has no logoURI, then will
   * also hydrate that.
   * @param tokenInfo
   * @returns Promise of the hydrated ITokenInfo
   */
  public hydratePrice(tokenInfo: ITokenInfo): Promise<ITokenInfo> {
    const tokenInfoId = this.getTokenGeckoId(tokenInfo.name, tokenInfo.symbol);

    if (tokenInfoId) {
      // else is not in coingecko
      const uri = `https://pro-api.coingecko.com/api/v3/coins/${tokenInfoId}?market_data=true&localization=false&community_data=false&developer_data=false&sparkline=false&x_cg_pro_api_key=${COINGECKO_API_KEY}`;

      return axios
        .get<{ market_data: { current_price: { usd?: number } }; image: { thumb: string } }>(uri)
        .then((response) => {
          tokenInfo.price = response.data.market_data.current_price.usd ?? 0;
          // tokenInfo.priceChangePercentage_24h = response.data.market_data.price_change_percentage_24h ?? 0;
          if (!tokenInfo.logoURI || tokenInfo.logoURI === TokenService.DefaultLogoURI) {
            tokenInfo.logoURI = response.data.image.thumb;
          }
          return tokenInfo;
        })
        .catch((ex) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          this.logger.error(`PriceService: Error fetching token price ${this.axiosService.axiosErrorHandler(ex)}`);
          return tokenInfo;
        });
    } else {
      return Promise.resolve(tokenInfo);
    }
  }

  public async isRequiredTokenContract(tokenAddress: Address, id?: number): Promise<boolean> {
    let isOk = true;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const timerLabel = `isRequiredTokenContract-${tokenAddress}${this.isNftId(id) ? `-${id!}` : ''}`;

    this.timingService.startTimer(timerLabel);
    const contract = this.getTokenContract(tokenAddress);
    try {
      await contract.deployed();
    } catch {
      return false;
    }

    try {
      if (this.ethereumService.targetedNetwork === Networks.Celo) {
        const proxyImplementation = await this.contractsService.getProxyImplementation(tokenAddress);
        if (proxyImplementation) {
          tokenAddress = proxyImplementation;
        }

        /**
         * TODO: fix this to work with a CELO block explorer:
         */
        const contractAbi = await axios
          .get<{ message: string; result: string }>(
            `https://api.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${ETHERSCAN_KEY}`,
          )
          .then((result) => {
            return result.data.message !== 'OK' ? null : result.data.result;
          });

        if (!contractAbi) {
          throw new Error('ABI not obtainable, contract may not be verified in etherscan');
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
              `TokenService: Token ${tokenAddress}${
                typeof id === 'undefined' ? '' : `-${id}`
              } fails to implement ERC interface on function: ${functionName}`,
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
                `TokenService: Token ${tokenAddress}${this.isNftId(id) ? `-${id!}` : ''} fails to implement ERC20 on event: ${eventName}`,
              );
              break;
            }
          }
        }
      } else {
        // a testnet, just do this
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await contract.name();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
      this.logger.error(`TokenService: Error confirming ERC20: ${error?.response?.data?.error?.message ?? error?.message}`);
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

  private getTokenGeckoId(name: string, symbol: string): string {
    const id = this.geckoCoinInfo.get(this.getTokenGeckoMapKey(name, symbol));
    if (id) {
      return id;
    } else {
      this.logger.warn(`TokenService: Unable to find token info in CoinGecko: (${name}/${symbol})`);
      return '';
    }
  }

  /**
   * Returns promise of a tokenInfo if the metadata is found in the tokenLists or
   * a valid token contract is found.
   *
   * If there is an error, then throws an exception.
   */
  private async _getTokenInfoFromAddress(
    tokenAddress: Address,
    resolve: (tokenInfo: ITokenInfo) => void,
    reject: (reason?: unknown) => void,
    id?: number,
  ): Promise<void> {
    const tokenAddressId = this.getTokenAddressId(tokenAddress, id);
    let tokenInfo = this.tokenInfos.get(tokenAddressId);

    if (!tokenInfo) {
      tokenAddress = getAddress(tokenAddress);

      if (!tokenAddress) {
        reject(`Invalid token address: ${tokenAddress}`);
        return;
      }

      /**
       * fetchTokenMetadata will throw an exception if it can't at least find a contract at the
       * given address.  Otherwise it may return an incomplete tokenInfo.
       */
      tokenInfo = (await this.getTokeinInfoOnChain(tokenAddress, id)) as ITokenInfo | undefined;
      if (!tokenInfo) {
        // is not a valid token contract, or some other error occurred
        reject(`Token does not appear to be a token contract: ${tokenAddress}`);
        return;
      }
      /**
       * Set defaults for missing values
       */
      if (!tokenInfo.name) {
        tokenInfo.name = TokenService.DefaultNameSymbol;
      }
      if (!tokenInfo.symbol) {
        tokenInfo.symbol = TokenService.DefaultNameSymbol;
      }
      if (!tokenInfo.decimals) {
        // NFTs have no decimals, always effectively 1
        tokenInfo.decimals = this.isNftId(id) ? 1 : TokenService.DefaultDecimals;
      }

      if (!tokenInfo.logoURI) {
        tokenInfo.logoURI = TokenService.DefaultLogoURI;
      }

      this.tokenInfos.set(tokenAddressId, tokenInfo);
      this.logger.info(`loaded token: ${tokenAddress}`);
    }

    resolve(tokenInfo);
  }

  private getTokenAddressId(address: Address, id?: number) {
    return typeof id !== 'undefined' ? `${address.toLowerCase()}_${id.toString()}` : address;
  }

  private async getTokeinInfoOnChain(address: string, id?: number): Promise<Partial<ITokenInfo> | undefined> {
    let tokenInfoResult: Partial<ITokenInfo> | undefined;

    try {
      const tokenContract = this.getTokenContract(address, id);

      await tokenContract.deployed();

      const tokenInfo = { address } as unknown as Partial<ITokenInfo>;
      tokenInfo.logoURI = undefined;
      /**
       * It is up to the caller to decide what to tolerate
       * in the way of incomplete information
       */
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        tokenInfo.name = await tokenContract.name();
        // eslint-disable-next-line no-empty
      } catch {}

      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        tokenInfo.symbol = await tokenContract.symbol();
        // eslint-disable-next-line no-empty
      } catch {}

      try {
        /** NFT contracts have no decimals.  account balances are always either 1 or 0. */
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        tokenInfo.decimals = this.isNftId(id) ? 1 : await tokenContract.decimals();
        // eslint-disable-next-line no-empty
      } catch {}

      tokenInfoResult = tokenInfo;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
      this.logger.error(`Failed to fetch onchain token metadata: ${error?.message}`);
    }
    return tokenInfoResult;
  }

  private isNftId(id?: number): boolean {
    return typeof id !== 'undefined';
  }
}
