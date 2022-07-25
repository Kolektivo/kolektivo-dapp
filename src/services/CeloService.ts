import { BaseProvider, ExternalProvider, Network, Web3Provider } from '@ethersproject/providers';
import { BigNumber, Signer, ethers } from 'ethers';
import { DI, IContainer, IEventAggregator, Registration } from 'aurelia';
import { IConsoleLogService } from './ConsoleLogService';
import { IDisclaimerService } from './DisclaimerService';
import { getAddress } from 'ethers/lib/utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

interface IEIP1193 {
  on(eventName: 'accountsChanged', handler: (accounts: Array<Address>) => void);
  on(eventName: 'chainChanged', handler: (chainId: number) => void);
  on(eventName: 'connect', handler: (info: { chainId: number }) => void);
  on(eventName: 'disconnect', handler: (reason: string) => void);
}

export type Address = string;
export type Hash = string;

export type AllowedNetworks = 'mainnet' | 'alfajores';

export enum Networks {
  Mainnet = 'mainnet',
  Alfajores = 'alfajores',
}

export const CELO_MAINNET_CHAIN_ID = 42220;
export const CELO_ALFAJORES_CHAIN_ID = 44787;

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
  transactions: Array<Hash>;
}

export interface IBlockInfo extends IBlockInfoNative {
  blockDate: Date;
}

export interface IChainEventInfo {
  chainId: number;
  chainName: AllowedNetworks;
  provider: Web3Provider;
}

export type ICeloService = CeloService;
export const ICeloService = DI.createInterface<ICeloService>('CeloService');
export class CeloService {
  public static ProviderEndpoints = {
    mainnet: `https://forno.celo.org`,
    alfajores: `https://alfajores-forno.celo-testnet.org`,
  };
  public static targetedNetwork: AllowedNetworks;
  public static targetedChainId: number;
  private static providerOptions = {
    torus: {
      package: {},
      options: {
        network: '',
      },
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          [CELO_MAINNET_CHAIN_ID]: 'https://forno.celo.org',
          [CELO_ALFAJORES_CHAIN_ID]: 'https://alfajores-forno.celo-testnet.org',
        },
      },
    },
  };
  /**
   * provided by ethers
   */
  public readOnlyProvider: BaseProvider;
  /**
   * provided by ethers given provider from Web3Modal
   */
  public walletProvider: Web3Provider;
  public defaultAccountAddress: Address;
  public lastBlock: IBlockInfo;
  private blockSubscribed: boolean;
  private web3Modal: Web3Modal;
  /**
   * provided by Web3Modal
   */
  private web3ModalProvider: Web3Provider & ExternalProvider;
  /**
   * signer or address
   */
  private defaultAccount: Signer | Address;

  private chainIdByName = new Map<AllowedNetworks, number>([
    [Networks.Mainnet, CELO_MAINNET_CHAIN_ID],
    [Networks.Alfajores, CELO_ALFAJORES_CHAIN_ID],
  ]);

  constructor(
    @IEventAggregator private readonly eventAggregator: IEventAggregator,
    @IConsoleLogService private readonly consoleLogService: IConsoleLogService,
    @IDisclaimerService private readonly disclaimerService: IDisclaimerService,
  ) {}

  public initialize(network: AllowedNetworks): void {
    if (!network) {
      throw new Error('Ethereum.initialize: `network` must be specified');
    }

    CeloService.targetedNetwork = network;
    CeloService.targetedChainId = this.chainIdByName.get(network);
    CeloService.providerOptions.torus.options.network = network;

    const readonlyEndPoint = CeloService.ProviderEndpoints[CeloService.targetedNetwork];
    if (!readonlyEndPoint) {
      throw new Error(`Please connect to either ${Networks.Mainnet} or ${Networks.Alfajores}`);
    }

    // comment out to run DISCONNECTED
    this.readOnlyProvider = ethers.getDefaultProvider(CeloService.ProviderEndpoints[CeloService.targetedNetwork]);
    this.readOnlyProvider.pollingInterval = 15000;

    // if (!this.blockSubscribed) {
    //   this.readOnlyProvider.on('block', (blockNumber: number) => this.handleNewBlock(blockNumber));
    //   this.blockSubscribed = true;
    // }
  }

  public ensureWeb3Modal(): void {
    if (!this.web3Modal) {
      this.web3Modal = new Web3Modal({
        // network: Networks.Mainnet,
        cacheProvider: false,
        providerOptions: CeloService.providerOptions, // required
        theme: 'dark',
      });
      /**
       * If a provider has been cached before, and is still set, Web3Modal will use it even
       * if we have pass `cachedProvider: false` above. `cachedProvider: true` only controls
       * whether the provider should be cached, not whether it should be used.
       * So call clearCachedProvider() here to clear it, just in case it has ever been set.
       */
      this.web3Modal?.clearCachedProvider();
    }
  }

  public async connect(): Promise<void> {
    if (!this.walletProvider) {
      this.ensureWeb3Modal();
      const web3ModalProvider = await this.web3Modal.connect();
      console.log(web3ModalProvider);
      this.setProvider(web3ModalProvider);
    }
  }

  /**
   *
   * @param web3ModalProvider should be a Web3Provider
   * @returns
   */
  public async switchToTargetedNetwork(web3ModalProvider: ExternalProvider): Promise<boolean> {
    const hexChainId = `0x${CeloService.targetedChainId.toString(16)}`;

    if (web3ModalProvider.request) {
      /**
       * note this will simply throw an exception when the website is running on localhost
       */
      await web3ModalProvider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }],
      });
      this.setProvider(web3ModalProvider as any);
      return true;
    }

    return false;
  }

  public disconnect(reason: string): void {
    this.web3ModalProvider?.removeListener('accountsChanged', this.handleAccountsChanged);
    this.web3ModalProvider?.removeListener('chainChanged', this.handleChainChanged);
    this.web3ModalProvider?.removeListener('disconnect', this.handleDisconnect);
    this.defaultAccount = undefined;
    this.defaultAccountAddress = undefined;
    this.fireAccountsChangedHandler(null);
    this.web3ModalProvider = undefined;
    this.walletProvider = undefined;
    this.fireDisconnectHandler(reason);
  }

  private async getNetwork(provider: Web3Provider): Promise<Network> {
    let network = await provider.getNetwork();
    network = Object.assign({}, network);
    if (network.name === 'homestead') {
      network.name = 'mainnet';
    }
    return network;
  }

  private async setProvider(web3ModalProvider: Web3Provider & IEIP1193 & ExternalProvider): Promise<void> {
    try {
      if (web3ModalProvider) {
        const walletProvider = new ethers.providers.Web3Provider(web3ModalProvider as any);
        (walletProvider as any).provider.autoRefreshOnNetworkChange = false; // mainly for metamask
        const network = await this.getNetwork(walletProvider);
        if (network.name !== CeloService.targetedNetwork) {
          this.eventAggregator.publish('Network.wrongNetwork', {
            provider: web3ModalProvider,
            connectedTo: network.name,
            need: CeloService.targetedNetwork,
          });
          return;
        }
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
        this.fireConnectHandler({ chainId: network.chainId, chainName: network.name, provider: this.walletProvider });
        this.fireAccountsChangedHandler(this.defaultAccountAddress);

        this.web3ModalProvider.on('accountsChanged', this.handleAccountsChanged);

        this.web3ModalProvider.on('chainChanged', this.handleChainChanged);

        this.web3ModalProvider.on('disconnect', this.handleDisconnect);

        // this.cachedProvider = this.walletProvider;
        // this.cachedWalletAccount = this.defaultAccountAddress;
      }
    } catch (error) {
      this.consoleLogService.logMessage(`Error connecting to wallet provider ${error?.message}`, 'error');
      // this.cachedProvider = null;
      // this.cachedWalletAccount = null;
      // this.web3Modal?.clearCachedProvider();
    }
  }

  private async getCurrentAccountFromProvider(provider: Web3Provider): Promise<Signer | string> {
    let account: Signer | string;
    if (Signer.isSigner(provider)) {
      account = provider;
    } else {
      const accounts = await provider.listAccounts();

      if (accounts) {
        account = getAddress(accounts[0]);
      } else {
        account = null;
      }
    }
    return account;
  }

  /**
   * address, even if signer
   */
  private async getDefaultAccountAddress(): Promise<Address | undefined> {
    if (Signer.isSigner(this.defaultAccount)) {
      return await this.defaultAccount.getAddress();
    } else {
      return getAddress(this.defaultAccount);
    }
  }

  private handleAccountsChanged = async (accounts?: Array<Address>) => {
    this.defaultAccount = await this.getCurrentAccountFromProvider(this.walletProvider);
    this.defaultAccountAddress = await this.getDefaultAccountAddress();
    this.fireAccountsChangedHandler(getAddress(accounts?.[0]));
  };

  private handleChainChanged = async (chainId: number) => {
    const network = ethers.providers.getNetwork(Number(chainId));
    if (network.name === 'homestead') {
      network.name = 'mainnet';
    }

    if (network.name !== CeloService.targetedNetwork) {
      this.eventAggregator.publish('Network.wrongNetwork', {
        provider: this.web3ModalProvider,
        connectedTo: network.name,
        need: CeloService.targetedNetwork,
      });
      return;
    } else {
      this.fireChainChangedHandler({
        chainId: network.chainId,
        chainName: network.name,
        provider: this.walletProvider,
      });
    }
  };

  private handleDisconnect = (reason: string) => {
    this.disconnect(reason);
  };

  private async fireAccountsChangedHandler(account: Address) {
    if (account && !(await this.disclaimerService.ensureDappDisclaimed(account))) {
      this.disconnect('User declined the Prime Deals disclaimer');
      account = null;
    }
    console.info(`account changed: ${account}`);
    this.eventAggregator.publish('Network.Changed.Account', account);
  }

  private fireChainChangedHandler(info: IChainEventInfo) {
    console.info(`chain changed: ${info.chainId}`);
    this.eventAggregator.publish('Network.Changed.Id', info);
  }

  private fireConnectHandler(info: IChainEventInfo) {
    console.info(`connected: ${info.chainName}`);
    this.eventAggregator.publish('Network.Changed.Connected', info);
  }

  private fireDisconnectHandler(reason: string) {
    console.info(`disconnected: ${reason}`);
    this.eventAggregator.publish('Network.Changed.Disconnect', reason);
  }

  public static register(container: IContainer) {
    Registration.singleton(ICeloService, CeloService).register(container);
  }
}
