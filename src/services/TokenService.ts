import { Address, EthereumService, Networks } from './EthereumService';
import { DI, IContainer, ILogger, Registration } from 'aurelia';
import { IAxiosService } from './AxiosService';
import { IErc20Token, ITokenInfo } from './TokenTypes';
import { Subject, from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import axios from 'axios';
// import TokenMetadataService from './TokenMetadataService';
import { COINGECKO_API_KEY, ETHERSCAN_KEY } from '../environment-variables';
import { Contract, ethers } from 'ethers';
import { ContractNames, ContractsService, IContractsService } from './ContractsService';
import { FormatTypes, Interface, getAddress } from 'ethers/lib/utils';
import { ITokenListProvider } from './TokenListProvider';
import { endTimer, startTimer } from './TimingService';

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

  private tokenInfos!: Map<Address, ITokenInfo>;
  private queue: Subject<() => Promise<void>>;
  // public tokenLists: TokenListMap;
  // private tokenPrices: Map<Address, number>;
  private geckoCoinInfo = new Map<string, string>();

  public static register(container: IContainer): void {
    container.register(Registration.singleton(ITokenService, TokenService));
  }

  constructor(
    @IContractsService private readonly contractsService: IContractsService,
    @ITokenListProvider private readonly tokenListProvider: ITokenListProvider,
    // private tokenMetadataService: TokenMetadataService,
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

  public async initialize(): Promise<void> {
    this.erc20Abi = ContractsService.getContractAbi(ContractNames.IERC20);

    void this.tokenListProvider.initialize().then(() => {
      /**
       * note these will not automatically have id or price initialized
       */
      this.tokenInfos = this.tokenListProvider.tokenInfos as Map<Address, ITokenInfo>;
    });

    const uri = `https://pro-api.coingecko.com/api/v3/coins/list?x_cg_pro_api_key=${COINGECKO_API_KEY}`;

    startTimer('get geckoCoinInfo');
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
    endTimer('get geckoCoinInfo');
  }

  /**
   * For a list of tokens, efficiently hydrate tokenInfo price from coingecko.
   * Does not hydrate logoURI.  Overrides pre-existing prices.
   * @param tokenInfos
   */
  public async getTokenPrices(tokenInfos: ITokenInfo[]): Promise<void> {
    startTimer('getTokenPrices');

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

    endTimer('getTokenPrices');
  }

  public async getTokenInfoFromAddress(tokenAddress: Address): Promise<ITokenInfo> {
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
    this.queue.next(() => this._getTokenInfoFromAddress(tokenAddress, resolver, rejector));

    return promise;
  }

  public getTokenContract(tokenAddress: Address): Contract & IErc20Token {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return new ethers.Contract(tokenAddress, this.erc20Abi, this.contractsService.createProvider())! as Contract & IErc20Token;
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

  public async isERC20Token(tokenAddress: Address): Promise<boolean> {
    let isOk = true;

    startTimer(`isERC20Token-${tokenAddress}`);
    const contract = this.getTokenContract(tokenAddress);
    try {
      await contract.deployed();
    } catch {
      return false;
    }

    try {
      if (EthereumService.targetedNetwork === Networks.Mainnet) {
        const proxyImplementation = await this.contractsService.getProxyImplementation(tokenAddress);
        if (proxyImplementation) {
          tokenAddress = proxyImplementation;
        }

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
        const ierc20Abi = ContractsService.getContractAbi(ContractNames.IERC20);
        const ierc20Interface = new Interface(ierc20Abi);

        for (const functionName in ierc20Interface.functions) {
          const contractFunction = contractInterface.functions[functionName];
          if (
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            !contractFunction ||
            contractFunction.format(FormatTypes.minimal) !== ierc20Interface.functions[functionName].format(FormatTypes.minimal)
          ) {
            isOk = false;
            this.logger.error(`TokenService: Token ${tokenAddress} fails to implement IERC20 on function: ${functionName}`);
            break;
          }
        }
        if (isOk) {
          for (const eventName in ierc20Interface.events) {
            const contractEvent = contractInterface.events[eventName];
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!contractEvent || contractEvent.format(FormatTypes.minimal) !== ierc20Interface.events[eventName].format(FormatTypes.minimal)) {
              isOk = false;
              this.logger.error(`TokenService: Token ${tokenAddress} fails to implement IERC20 on event: ${eventName}`);
              break;
            }
          }
        }
      } else {
        // a testnet, just do this
        await contract.totalSupply();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
      this.logger.error(`TokenService: Error confirming IERC20: ${error?.response?.data?.error?.message ?? error?.message}`);
      isOk = false;
    }

    endTimer(`isERC20Token-${tokenAddress}`);

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
   * returns promise of a tokenInfo if the metadata is found in the tokenLists or
   * a valid token contract is found.
   *
   * If there is an error, then throws an exception.
   */
  private async _getTokenInfoFromAddress(
    tokenAddress: Address,
    resolve: (tokenInfo: ITokenInfo) => void,
    reject: (reason?: unknown) => void,
  ): Promise<void> {
    let tokenInfo = this.tokenInfos.get(tokenAddress.toLowerCase());

    if (!tokenInfo) {
      startTimer(`_getTokenInfoFromAddress-${getAddress(tokenAddress)}`);

      tokenAddress = getAddress(tokenAddress);

      if (!tokenAddress) {
        reject(`Invalid token address: ${tokenAddress}`);
        return;
      }

      /**
       * fetchTokenMetadata will throw an exception if it can't at least find a contract at the
       * given address.  Otherwise it may return an incomplete tokenInfo.
       */
      tokenInfo = (await this.getTokeinInfoOnChain(tokenAddress)) as ITokenInfo | undefined;
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
        tokenInfo.decimals = TokenService.DefaultDecimals;
      }

      if (!tokenInfo.logoURI) {
        tokenInfo.logoURI = TokenService.DefaultLogoURI;
      }

      this.tokenInfos.set(tokenAddress.toLowerCase(), tokenInfo);
      endTimer(`_getTokenInfoFromAddress-${tokenAddress}`);
      this.logger.info(`loaded token: ${tokenAddress}`);
    }

    resolve(tokenInfo);
  }

  private async getTokeinInfoOnChain(address: string): Promise<Partial<ITokenInfo> | undefined> {
    let tokenInfoResult: Partial<ITokenInfo> | undefined;

    try {
      const tokenContract = this.getTokenContract(address) as Contract &
        IErc20Token & {
          name: () => Promise<string>;
          symbol: () => Promise<string>;
          decimals: () => Promise<number>;
          deployed: () => Promise<boolean>;
        };

      await tokenContract.deployed();

      const tokenInfo = { address } as unknown as Partial<ITokenInfo>;
      const logoURI = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      const logoFound = await axios.get(logoURI).catch(() => null);
      tokenInfo.logoURI = logoFound ? logoURI : undefined;
      /**
       * It is up to the caller to decide what to tolerate
       * in the way of incomplete information
       */
      try {
        tokenInfo.name = await tokenContract.name();
        // eslint-disable-next-line no-empty
      } catch {}
      try {
        tokenInfo.symbol = await tokenContract.symbol();
        // eslint-disable-next-line no-empty
      } catch {}
      try {
        tokenInfo.decimals = await tokenContract.decimals();
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
}