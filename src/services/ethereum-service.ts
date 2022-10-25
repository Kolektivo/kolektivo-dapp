import { BaseProvider, JsonRpcProvider, Network, Web3Provider, getNetwork } from '@ethersproject/providers';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import { DI, IContainer, IEventAggregator, ILogger, Registration } from 'aurelia';
import { IBrowserStorageService } from './browser-storage-service';
import { IConfiguration } from 'configurations/configuration';
import { Signer } from '@ethersproject/abstract-signer';
import { formatString, truncateDecimals } from '../utils';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { getAddress } from '@ethersproject/address';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import { AllowedNetworks } from 'models/allowed-network';
import { ICacheService } from './cache-service';
import { IWalletProvider, ProviderType } from 'wallet-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { cache } from 'decorators/cache';
import detectEthereumProvider from '@metamask/detect-provider';

export type Address = string;
export type Hash = string;

export interface IBlockInfoNative {
  hash: Hash;
  /**
   * previous block
   */
  parentHash: Hash;
  /**
   *The height(number) of this
   */
  number: number;
  timestamp: number;
  /**
   * The maximum amount of gas that this block was permitted to use. This is a value that can be voted up or voted down by miners and is used to automatically adjust the bandwidth requirements of the network.
   */
  gasLimit: BigNumber;
  /**
   * The total amount of gas used by all transactions in this
   */
  gasUsed: BigNumber;
  transactions: Hash[];
}

export interface IBlockInfo extends IBlockInfoNative {
  blockDate: Date;
}

const CELO_MAINNET_CHAIN_ID = 42220;

const CELO_ALFAJORES_CHAIN_ID = 44787;

export interface IChainEventInfo {
  chainId?: number;
  chainName?: AllowedNetworks;
  provider?: Web3Provider | null;
}

export type IEthereumService = EthereumService;
export const IEthereumService = DI.createInterface<IEthereumService>('EthereumService');

export class EthereumService {
  constructor(
    @IEventAggregator private readonly eventAggregator: IEventAggregator,
    @IBrowserStorageService private readonly storageService: IBrowserStorageService,
    @ILogger private readonly logger: ILogger,
    @IConfiguration private readonly configuration: IConfiguration,
    @ICacheService private readonly cacheService: ICacheService,
    @IWalletProvider private readonly walletProvider: IWalletProvider,
  ) {
    this.logger = logger.scopeTo('EthereumService');
    this.initialize();
  }

  public static register(container: IContainer) {
    Registration.singleton(IEthereumService, EthereumService).register(container);
  }

  public targetedNetwork: AllowedNetworks | null = null;
  public targetedChainId?: number;
  public lastBlock?: IBlockInfo;
  /**
   * Provided by ethers.
   */
  public readOnlyProvider = {} as BaseProvider;
  /**
   * Provided by CeloProvider.  Enables getBlock to work.
   * Would also be needed if we ever use the following:
   *   sendTransaction
   *   getGasPrice
   *   prepareRequest
   * See https://github.com/celo-tools/celo-ethers-wrapper.
   */
  private providerForCeloWithEthers = {} as BaseProvider;
  /**
   * provided by ethers given provider from Web3Modal
   */
  public currentProvider?: Web3Provider;

  public defaultAccountAddress: Address | null = null;
  /**
   * signer or address
   */
  private defaultAccount?: Signer | Address | null;

  public readonly endpoints: Record<AllowedNetworks, string> = {
    // Celo: `https://forno.celo.org`,
    Celo: 'https://celo.rpcs.dev:8545',
    // Alfajores: `https://e761db8d40ea4f95a10923da3ffa47a3.eth.rpc.rivet.cloud/`,
    Alfajores: `https://alfajores.rpcs.dev:8545`,
    // Alfajores: `https://alfajores-forno.celo-testnet.org`,
    // Alfajores: `https://celo-alfajores-rpc.allthatnode.com`,
    // Alfajores: `https://celo-alfajores-rpc.allthatnode.com/QpHXTMEr0FbAgsVRUg8eYMbOrQy6KLxr`,
  };

  public initialize() {
    if (typeof this.configuration.network !== 'string') {
      throw new Error('Ethereum.initialize: network must be specified');
    }

    this.targetedNetwork = this.configuration.network;
    this.targetedChainId = this.chainIdByName.get(this.targetedNetwork);

    if (!this.chainIdByName.get(this.configuration.network)) {
      throw new Error('Ethereum.initialize: `unsupported network');
    }

    const readonlyEndPoint = this.endpoints[this.targetedNetwork];
    if (typeof readonlyEndPoint !== 'string') {
      throw new Error(`Please connect your wallet to either ${AllowedNetworks.Celo} or ${AllowedNetworks.Alfajores}`);
    }

    this.readOnlyProvider = new JsonRpcProvider(
      { url: this.endpoints[this.targetedNetwork], skipFetchSetup: true },
      {
        name: this.targetedNetwork.toLowerCase(),
        chainId: this.targetedChainId ?? 0,
      },
    );
    this.providerForCeloWithEthers = new CeloProvider(
      { url: this.endpoints[this.targetedNetwork], skipFetchSetup: true },
      {
        name: this.targetedNetwork.toLowerCase(),
        chainId: this.targetedChainId ?? 0,
      },
    );
  }

  private chainIdByName = new Map<AllowedNetworks, number>([
    [AllowedNetworks.Celo, CELO_MAINNET_CHAIN_ID],
    [AllowedNetworks.Alfajores, CELO_ALFAJORES_CHAIN_ID],
  ]);

  private async getCurrentAccountFromProvider(provider: Web3Provider): Promise<Signer | string | null> {
    let account: Signer | string | null;
    if (Signer.isSigner(provider)) {
      account = provider;
    } else {
      const accounts = await provider.listAccounts();

      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (accounts?.length) {
        account = getAddress(accounts[0]);
      } else {
        account = null;
      }
    }
    return account;
  }

  private fireAccountsChangedHandler(account: Address | null): void {
    // if (account && !(await this.disclaimerService.ensureDappDisclaimed(account))) {
    // this.disconnect({ code: -1, message: 'User declined the Prime Deals disclaimer' });
    // account = null;
    // }
    this.logger.info(`account changed: ${account ?? 'null'}`);
    this.eventAggregator.publish('Network.Changed.Account', account);
  }
  private fireChainChangedHandler(info: IChainEventInfo): void {
    this.logger.info(`chain changed: ${info.chainId ?? 'undefined'}`);
    this.eventAggregator.publish('Network.Changed.Id', info);
  }
  private fireConnectHandler(info: IChainEventInfo): void {
    this.logger.info(`connected: ${info.chainName ?? 'undefined'}`);
    this.eventAggregator.publish('Network.Changed.Connected', info);
  }
  private fireDisconnectHandler(error: { code: number; message: string }): void {
    this.logger.info(`disconnected: ${error.code}: ${error.message}`);
    this.eventAggregator.publish('Network.Changed.Disconnect', error);
  }

  /**
   * address, even if signer
   */
  private async getDefaultAccountAddress(): Promise<Address> {
    if (!this.defaultAccount) {
      throw new Error('getDefaultAccountAddress: no defaultAccount');
    }
    if (Signer.isSigner(this.defaultAccount)) {
      return await this.defaultAccount.getAddress();
    } else {
      return getAddress(this.defaultAccount);
    }
  }

  /**
   * get signer or provider for use by ethers Contracts
   * @returns
   */
  public createSignerOrProvider(): BaseProvider | Signer {
    return this.createSignerOrProviderForAddress(this.defaultAccountAddress);
  }

  /**
   * The cache restricts this from being invoked unless it has new input parameters.
   * @param accountAddress
   * @param provider
   * @returns
   */
  @cache<EthereumService>(function () {
    return { storage: this.cacheService };
  })
  public createSignerOrProviderForAddress(accountAddress: Address | Signer | null): BaseProvider | Signer {
    let signerOrProvider: Address | Signer | JsonRpcProvider | BaseProvider;
    if (accountAddress && this.currentProvider) {
      signerOrProvider = Signer.isSigner(accountAddress) ? accountAddress : this.currentProvider.getSigner(accountAddress);
    } else {
      signerOrProvider = this.readOnlyProvider;
    }
    return signerOrProvider;
  }

  public getDefaultSigner(): Signer {
    if (!this.defaultAccountAddress) {
      throw new Error('getDefaultSigner: no defaultAccountAddress');
    }
    if (!this.currentProvider) {
      throw new Error('getDefaultSigner: no walletProvider');
    }
    return this.currentProvider.getSigner(this.defaultAccountAddress);
  }

  public async connect(): Promise<void> {
    await this.walletProvider.connect();
    void this.setProvider();
  }

  public async connectKolektivoWallet(): Promise<void> {
    await this.walletProvider.connect('walletconnect');
    void this.setProvider();
  }

  public ensureConnected(): boolean {
    if (!this.defaultAccountAddress) {
      // TODO: make this await until we're either connected or not?
      void this.connect();
      return false;
    } else {
      return true;
    }
  }

  /**
   * silently connect to metamask if a metamask account is already connected,
   * without invoking Web3Modal nor MetaMask popups.
   */
  public async connectToConnectedProvider(): Promise<void> {
    const provider: MetaMaskInpageProvider | null = await detectEthereumProvider({ mustBeMetaMask: true });
    if (!provider) return;
    if (!(await provider._metamask.isUnlocked())) return;
    const chainId = Number(await provider.request({ method: 'eth_chainId' }));
    if (chainId !== this.targetedChainId) return;

    if (!((await provider.request({ method: 'eth_accounts' })) as string[]).length) return;
    this.walletProvider.provider = provider as unknown as ProviderType;

    return this.setProvider();
  }

  private cleanNetworkName(network: Network | null): Network | null {
    if (network) {
      const clonedNetwork = Object.assign(network) as Network;
      if (clonedNetwork.name === 'homestead') {
        clonedNetwork.name = 'Ethereum Mainnet';
      } else if (clonedNetwork.name === 'unknown') {
        /**
         * metamask has a hard time recognizing these names
         */
        switch (clonedNetwork.chainId) {
          case CELO_ALFAJORES_CHAIN_ID:
            clonedNetwork.name = AllowedNetworks.Alfajores;
            break;
          case CELO_MAINNET_CHAIN_ID:
            clonedNetwork.name = AllowedNetworks.Celo;
            break;
          default:
            clonedNetwork.name = '';
            break;
        }
      }
      return clonedNetwork;
    }
    return null;
  }

  private async getNetwork(provider: Web3Provider): Promise<Network | null> {
    const network = (await provider.getNetwork()) as Network | null;
    return this.cleanNetworkName(network);
  }

  /**
   *
   * @param web3ModalProvider The provider created by Web3Modal
   */
  private async setProvider(): Promise<void> {
    try {
      if (!this.walletProvider.provider) return;
      const walletProvider = new Web3Provider(this.walletProvider.provider);

      const network = await this.getNetwork(walletProvider);
      if (!network) return;

      if (network.chainId !== this.targetedChainId) {
        this.eventAggregator.publish('Network.wrongNetwork', {
          connectedTo: network.name,
          need: this.targetedNetwork,
        });
      } else {
        /**
         * we will keep the original readonly provider which should still be fine since
         * the targeted network cannot have changed.
         */
        this.currentProvider = walletProvider;
        this.defaultAccount = await this.getCurrentAccountFromProvider(this.currentProvider);
        this.defaultAccountAddress = await this.getDefaultAccountAddress();
        /**
         * because the events aren't fired on first connection
         */
        this.fireConnectHandler({ chainId: network.chainId, chainName: network.name as AllowedNetworks, provider: this.currentProvider });
        this.fireAccountsChangedHandler(this.defaultAccountAddress);

        this.walletProvider.provider.on('accountsChanged', (accounts?: Address[]) => void this.handleAccountsChanged(accounts));
        this.walletProvider.provider.on('chainChanged', this.handleChainChanged);
        this.walletProvider.provider.on('disconnect', (error: { code: number; message: string }) => this.handleDisconnect(error));
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
      this.logger.error(`Error connecting to wallet provider ${error?.message}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-template-expressions
      alert(`Error connecting to wallet provider ${error?.message}`);
    }
  }

  private async handleAccountsChanged(accounts?: Address[]): Promise<void> {
    if (this.currentProvider) {
      this.defaultAccount = await this.getCurrentAccountFromProvider(this.currentProvider);
      this.defaultAccountAddress = await this.getDefaultAccountAddress();
      this.fireAccountsChangedHandler(accounts?.length ? getAddress(accounts[0]) : null);
    }
  }

  private handleChainChanged = (chainId: number): void => {
    let network = getNetwork(Number(chainId)) as Network | null;

    network = this.cleanNetworkName(network);
    if (!network) return;

    if (network.chainId !== this.targetedChainId) {
      this.eventAggregator.publish('Network.wrongNetwork', {
        connectedTo: network.name,
        need: this.targetedNetwork,
      });
      return;
    } else {
      this.fireChainChangedHandler({ chainId: network.chainId, chainName: network.name as AllowedNetworks, provider: this.currentProvider ?? null });
    }
  };

  private handleDisconnect = (error: { code: number; message: string }) => {
    this.disconnect(error);
  };

  public disconnect(error: { code: number; message: string }): void {
    this.walletProvider.provider?.removeListener('accountsChanged', (accounts?: Address[]) => void this.handleAccountsChanged(accounts));
    this.walletProvider.provider?.removeListener('chainChanged', this.handleChainChanged);
    this.walletProvider.provider?.removeListener('disconnect', this.handleDisconnect);
    this.defaultAccount = undefined;
    this.defaultAccountAddress = null;
    this.fireAccountsChangedHandler(null);
    this.currentProvider = undefined;
    this.fireDisconnectHandler(error);
  }

  /**
   *
   * @param web3ModalProvider should be a Web3Provider
   * @returns
   */
  public async switchToTargetedNetwork(): Promise<boolean> {
    if (typeof this.targetedChainId !== 'number') {
      return false;
    }
    const hexChainId = `0x${this.targetedChainId.toString(16)}`;
    try {
      /**
       * note this will simply throw an exception when the website is running on localhost
       */
      await this.walletProvider.provider?.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
      await this.setProvider();
      return true;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // user rejected request
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (err.code === 4001) {
        // return false;
      }
      // chain does not exist, let's add it (see balancer)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      else if (err.code === 4902) {
        /**
         * we might be able to add it here, but for now:
         * Balancer does this:  // return importNetworkDetailsToWallet(provider);
         */

        throw new Error(`The ${this.targetedNetwork ?? 'unknown'} network is not installed in your Metamask configuration`);
      }
    }
    return false;
  }

  public async addTokenToMetamask(tokenAddress: Address, tokenSymbol: string, tokenDecimals: number, tokenImage: string): Promise<boolean> {
    let wasAdded = false;

    if (this.currentProvider) {
      if (this.getMetamaskHasToken(tokenAddress)) {
        return true;
      }

      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
        wasAdded = (await this.walletProvider.provider?.request?.({
          method: 'wallet_watchAsset',
          params: [
            {
              type: 'ERC20', // Initially only supports ERC20, but eventually more!
              options: {
                address: tokenAddress, // The address that the token is at.
                symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                decimals: tokenDecimals, // The number of decimals in the token
                image: tokenImage, // A string url of the token logo
              },
            },
          ],
        })) as boolean;

        if (wasAdded) {
          this.setMetamaskHasToken(tokenAddress);
        }
      } catch (error) {
        this.logger.error(error);
      }
    }

    return wasAdded;
  }

  public getMetamaskHasToken(tokenAddress: Address): boolean {
    if (!this.defaultAccountAddress) {
      throw new Error('metamaskHasToken: no account');
    }
    return !!this.storageService.lsGet(this.getKeyForMetamaskHasToken(tokenAddress));
  }

  private getKeyForMetamaskHasToken(tokenAddress: Address): string {
    if (!this.defaultAccountAddress) {
      throw new Error('getKeyForMetamaskHasToken: no account');
    }
    return `${this.defaultAccountAddress}_${tokenAddress}`;
  }

  private setMetamaskHasToken(tokenAddress: Address): void {
    if (!this.defaultAccountAddress) {
      throw new Error('metamaskHasToken: no account');
    }
    this.storageService.lsSet(this.getKeyForMetamaskHasToken(tokenAddress), true);
  }

  public async getBlock(blockNumber: number): Promise<IBlockInfo> {
    const block = (await this.providerForCeloWithEthers.getBlock(blockNumber)) as unknown as IBlockInfo;
    block.blockDate = new Date(block.timestamp * 1000);
    return block;
  }

  public getEtherscanLink(addressOrHash?: string, tx = false): string {
    return formatString(this.configuration.scanLink, { type: tx ? 'tx' : 'address', address: addressOrHash });
  }

  /**
   * returns ENS if the address maps to one
   * @param address
   * @returns null if there is no ENS
   */
  public getEnsForAddress(address: Address): Promise<string | null> {
    return this.readOnlyProvider.lookupAddress(address).catch(() => null);
  }

  /**
   * Returns address that is represented by the ENS.
   * Returns null if it can't resolve the ENS to an address
   * Returns address if it already is an address
   */
  public getAddressForEns(ens: string): Promise<Address | null> {
    /**
     * returns the address if ens already is an address
     */
    return this.readOnlyProvider.resolveName(ens).catch(() => null); // is neither address nor ENS
  }
}

/**
 * @param ethValue
 * @param decimals Can be a number or:
 *  "wei",
 *  "kwei",
 *  "mwei",
 *  "gwei",
 *  "szabo",
 *  "finney",
 *  "ether",
 * @returns
 */
export const toWei = (ethValue: BigNumberish, decimals: string | number): BigNumber => {
  const t = typeof ethValue;
  if (t === 'string' || t === 'number') {
    // avoid underflows
    ethValue = truncateDecimals(Number(ethValue), Number(decimals));
  }
  return parseUnits(ethValue.toString(), decimals);
};

/**
 * @param weiValue
 * @param decimals Can be a number or:
 *  "wei",
 *  "kwei",
 *  "mwei",
 *  "gwei",
 *  "szabo",
 *  "finney",
 *  "ether",
 * @returns
 */
export const fromWei = (weiValue: BigNumberish, decimals: string | number): string => {
  return formatUnits(weiValue.toString(), decimals);
};

export const NULL_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000';
