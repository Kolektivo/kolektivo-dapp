import { BaseProvider, ExternalProvider, Network, Web3Provider, getNetwork } from '@ethersproject/providers';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { CeloProvider } from '@celo-tools/celo-ethers-wrapper';
import { DI, IContainer, IEventAggregator, ILogger, Registration } from 'aurelia';
import { IBrowserStorageService } from './browser-storage-service';
import { INotificationService } from '../design-system/services/notification/notification-service';
import { Signer } from '@ethersproject/abstract-signer';
import { callOnce } from '../decorators/call-once';
import { ethers } from 'ethers';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { getAddress } from '@ethersproject/address';
import { truncateDecimals } from '../utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import detectEthereumProvider from '@metamask/detect-provider';

interface IEIP1193 {
  on(eventName: 'accountsChanged', handler: (accounts: Address[]) => void): void;
  on(eventName: 'chainChanged', handler: (chainId: number) => void): void;
  on(eventName: 'connect', handler: (info: { chainId: number }) => void): void;
  on(eventName: 'disconnect', handler: (error: { code: number; message: string }) => void): void;
}

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

export enum Networks {
  Celo = 'Celo',
  Alfajores = 'Alfajores',
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
export type WalletProvider = Web3Provider & IEIP1193 & ExternalProvider;
type MetamaskProvider = WalletProvider &
  ExternalProvider & {
    autoRefreshOnNetworkChange: boolean;
    _metamask?: { isUnlocked?: () => Promise<boolean> };
  };

export class EthereumService {
  constructor(
    @IEventAggregator private readonly eventAggregator: IEventAggregator,
    @IBrowserStorageService private readonly storageService: IBrowserStorageService,
    @ILogger private readonly logger: ILogger,
    @INotificationService private readonly notificationService: INotificationService,
  ) {
    this.logger = logger.scopeTo('EthereumService');
  }

  public static register(container: IContainer) {
    Registration.singleton(IEthereumService, EthereumService).register(container);
  }

  public readonly endpoints: Record<AllowedNetworks, string> = {
    // Celo: `https://forno.celo.org`,
    Celo: 'https://celo.rpcs.dev:8545',
    // alfajores: `https://e761db8d40ea4f95a10923da3ffa47a3.eth.rpc.rivet.cloud/`,
    Alfajores: `https://alfajores.rpcs.dev:8545`,
    // alfajores: `https://alfajores-forno.celo-testnet.org`,
    // alfajores: `https://celo-alfajores-rpc.allthatnode.com`,
  };

  private readonly providerOptions = {
    // TODO: test with walletconnect
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        rpc: {
          CELO_MAINNET_CHAIN_ID: this.endpoints[Networks.Celo],
          CELO_ALFAJORES_CHAIN_ID: this.endpoints[Networks.Alfajores],
        },
      },
    },
  };

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
  public walletProvider?: Web3Provider;

  public defaultAccountAddress: Address | null = null;

  private blockSubscribed?: boolean;
  /**
   * signer or address
   */
  private defaultAccount?: Signer | Address | null;

  private async handleNewBlock(blockNumber: number): Promise<void> {
    const block = await this.getBlock(blockNumber);
    this.lastBlock = block;
    this.eventAggregator.publish('Network.NewBlock', block);
    this.logger.info(`got a new block: ${blockNumber}`);
  }

  @callOnce('Ethereum Service')
  public async initialize(network: AllowedNetworks): Promise<void> {
    if (typeof network !== 'string') {
      throw new Error('Ethereum.initialize: `network` must be specified');
    }

    if (!this.chainIdByName.get(network)) {
      throw new Error('Ethereum.initialize: `unsupported network');
    }

    this.targetedNetwork = network;
    this.targetedChainId = this.chainIdByName.get(network);

    const readonlyEndPoint = this.endpoints[this.targetedNetwork];
    if (typeof readonlyEndPoint !== 'string') {
      throw new Error(`Please connect your wallet to either ${Networks.Celo} or ${Networks.Alfajores}`);
    }

    this.readOnlyProvider = ethers.getDefaultProvider(this.endpoints[this.targetedNetwork]);
    this.providerForCeloWithEthers = new CeloProvider(this.endpoints[this.targetedNetwork]);

    return this.readOnlyProvider.ready.then(() => {
      this.readOnlyProvider.pollingInterval = 5000;

      if (!this.blockSubscribed) {
        this.readOnlyProvider.on('block', (blockNumber: number) => {
          void this.handleNewBlock(blockNumber);
        });
        this.blockSubscribed = true;
      }
    });
  }

  private web3Modal?: Web3Modal;
  /**
   * provided by Web3Modal
   */
  private web3ModalProvider?: WalletProvider;

  private chainNameById = new Map<number, AllowedNetworks>([
    [CELO_MAINNET_CHAIN_ID, Networks.Celo],
    [CELO_ALFAJORES_CHAIN_ID, Networks.Alfajores],
  ]);

  private chainIdByName = new Map<AllowedNetworks, number>([
    [Networks.Celo, CELO_MAINNET_CHAIN_ID],
    [Networks.Alfajores, CELO_ALFAJORES_CHAIN_ID],
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

  public getDefaultSigner(): Signer {
    if (!this.defaultAccountAddress) {
      throw new Error('getDefaultSigner: no defaultAccountAddress');
    }
    if (!this.walletProvider) {
      throw new Error('getDefaultSigner: no walletProvider');
    }
    return this.walletProvider.getSigner(this.defaultAccountAddress);
  }

  public async connect(): Promise<void> {
    if (!this.walletProvider) {
      this.ensureWeb3Modal();
      const web3ModalProvider = (await this.web3Modal?.connect()) as WalletProvider;
      void this.setProvider(web3ModalProvider);
    }
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
    this.ensureWeb3Modal();

    let provider: MetamaskProvider | null = null;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-condition
    if (detectEthereumProvider) {
      provider = (await detectEthereumProvider({ mustBeMetaMask: true })) as MetamaskProvider | null;
    }

    if (typeof provider === 'object' && provider?._metamask?.isUnlocked && provider.request) {
      /**
       * at this writing, `_metamask.isUnlocked` is "experimental", according to MetaMask.
       * It tells us that the user has logged into Metamask.
       * However, it doesn't tell us whether an account is connected to this dApp.
       * but it sure helps us know whether we can connect without MetaMask asking the user to log in.
       */
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (await provider._metamask.isUnlocked()) {
        const chainId = Number(await provider.request({ method: 'eth_chainId' }));
        if (chainId === this.targetedChainId) {
          const accounts = (await provider.request({ method: 'eth_accounts' })) as string[];
          if (accounts.length) {
            // const account = getAddress(accounts[0]);
            // if (this.disclaimerService.isDappDisclaimed(account)) {
            // this.logger.info(`autoconnecting to ${account}`);
            return this.setProvider(provider);
            // }
          }
        }
      }
    }
  }

  private ensureWeb3Modal(): void {
    if (!this.web3Modal) {
      this.web3Modal = new Web3Modal({
        // network: Networks.CELO,
        cacheProvider: false,
        providerOptions: this.providerOptions, // required
        theme: 'dark',
      });
      /**
       * If a provider has been cached before, and is still set, Web3Modal will use it even
       * if we have pass `cachedProvider: false` above. `cachedProvider: true` only controls
       * whether the provider should be cached, not whether it should be used.
       * So call clearCachedProvider() here to clear it, just in case it has ever been set.
       */
      this.web3Modal.clearCachedProvider();
    }
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
            clonedNetwork.name = Networks.Alfajores;
            break;
          case CELO_MAINNET_CHAIN_ID:
            clonedNetwork.name = Networks.Celo;
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
  private async setProvider(web3ModalProvider?: WalletProvider): Promise<void> {
    try {
      if (web3ModalProvider) {
        const walletProvider = new Web3Provider(web3ModalProvider);

        (walletProvider.provider as MetamaskProvider).autoRefreshOnNetworkChange = false; // mainly for metamask

        const network = await this.getNetwork(walletProvider);
        if (!network) return;

        if (network.chainId !== this.targetedChainId) {
          this.eventAggregator.publish('Network.wrongNetwork', {
            provider: web3ModalProvider,
            connectedTo: network.name,
            need: this.targetedNetwork,
          });
        } else {
          /**
           * we will keep the original readonly provider which should still be fine since
           * the targeted network cannot have changed.
           */
          this.walletProvider = walletProvider;
          this.web3ModalProvider = web3ModalProvider;
          this.defaultAccount = await this.getCurrentAccountFromProvider(this.walletProvider);
          this.defaultAccountAddress = await this.getDefaultAccountAddress();
          /**
           * because the events aren't fired on first connection
           */
          this.fireConnectHandler({ chainId: network.chainId, chainName: network.name as AllowedNetworks, provider: this.walletProvider });
          this.fireAccountsChangedHandler(this.defaultAccountAddress);

          this.web3ModalProvider.on('accountsChanged', (accounts?: Address[]) => void this.handleAccountsChanged(accounts));

          this.web3ModalProvider.on('chainChanged', this.handleChainChanged);

          this.web3ModalProvider.on('disconnect', (error: { code: number; message: string }) => this.handleDisconnect(error));
        }
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
    if (this.walletProvider) {
      this.defaultAccount = await this.getCurrentAccountFromProvider(this.walletProvider);
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
        provider: this.web3ModalProvider,
        connectedTo: network.name,
        need: this.targetedNetwork,
      });
      return;
    } else {
      this.fireChainChangedHandler({ chainId: network.chainId, chainName: network.name as AllowedNetworks, provider: this.walletProvider ?? null });
    }
  };

  private handleDisconnect = (error: { code: number; message: string }) => {
    this.disconnect(error);
  };

  public disconnect(error: { code: number; message: string }): void {
    // this.cachedProvider = null;
    // this.cachedWalletAccount = null;
    // this.web3Modal?.clearCachedProvider(); // so web3Modal will let the user reconnect
    this.web3ModalProvider?.removeListener('accountsChanged', (accounts?: Address[]) => void this.handleAccountsChanged(accounts));
    this.web3ModalProvider?.removeListener('chainChanged', this.handleChainChanged);
    this.web3ModalProvider?.removeListener('disconnect', this.handleDisconnect);
    this.defaultAccount = undefined;
    this.defaultAccountAddress = null;
    this.fireAccountsChangedHandler(null);
    this.web3ModalProvider = undefined;
    this.walletProvider = undefined;
    this.fireDisconnectHandler(error);
  }

  /**
   *
   * @param web3ModalProvider should be a Web3Provider
   * @returns
   */
  public async switchToTargetedNetwork(web3ModalProvider: WalletProvider): Promise<boolean> {
    if (typeof this.targetedChainId !== 'number') {
      return false;
    }
    const hexChainId = `0x${this.targetedChainId.toString(16)}`;
    try {
      if (web3ModalProvider.request) {
        /**
         * note this will simply throw an exception when the website is running on localhost
         */
        await web3ModalProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: hexChainId }],
        });
        await this.setProvider(web3ModalProvider);
        return true;
      }
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
        void this.notificationService.toast({
          message: `The ${this.targetedNetwork ?? 'unknown'} network is not installed in your Metamask configuration`,
          type: 'danger',
        });
      }
    }
    return false;
  }

  public async addTokenToMetamask(tokenAddress: Address, tokenSymbol: string, tokenDecimals: number, tokenImage: string): Promise<boolean> {
    let wasAdded = false;

    if (this.walletProvider) {
      if (this.getMetamaskHasToken(tokenAddress)) {
        return true;
      }

      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any
        wasAdded = (await (this.web3ModalProvider as unknown as any).request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: tokenAddress, // The address that the token is at.
              symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
              decimals: tokenDecimals, // The number of decimals in the token
              image: tokenImage, // A string url of the token logo
            },
          },
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

  /**
   * so unit tests will be able to complete
   */
  public dispose(): void {
    this.readOnlyProvider.off('block', (blockNumber: number) => {
      void this.handleNewBlock(blockNumber);
    });
  }

  public async getBlock(blockNumber: number): Promise<IBlockInfo> {
    const block = (await this.providerForCeloWithEthers.getBlock(blockNumber)) as unknown as IBlockInfo;
    block.blockDate = new Date(block.timestamp * 1000);
    return block;
  }

  public getEtherscanLink(addressOrHash: Address | Hash | null, tx = false): string {
    if (!addressOrHash) {
      return '';
    } else if (this.targetedNetwork === Networks.Celo) {
      return `https://celoscan.io/${tx ? 'tx' : 'address'}/${addressOrHash}`;
    } else {
      return `https://alfajores-blockscout.celo-testnet.org/${tx ? 'tx' : 'address'}/${addressOrHash}`;
    }
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
