import { AllowedNetworks } from './../models/allowed-network';
import { BigNumber } from '@ethersproject/bignumber';
import { DI, IContainer, IEventAggregator, ILogger, Registration } from 'aurelia';
import { IConfiguration } from 'configurations/configuration';
import { IReadOnlyProvider } from 'read-only-provider';
import { IWalletConnectConnectorOptions } from 'web3modal/dist/providers/connectors/walletconnect';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { Signer } from 'ethers';
import { formatString } from '../utils';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import detectEthereumProvider from '@metamask/detect-provider';

export interface IBlockInfoNative {
  hash: string;
  /**
   * previous block
   */
  parentHash: string;
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
  transactions: string[];
}

export interface IBlockInfo extends IBlockInfoNative {
  blockDate: Date;
}

export interface IChainEventInfo {
  chainId?: number;
  chainName?: AllowedNetworks;
  provider?: Web3Provider | null;
}

export type IEthereumService = EthereumService;
export const IEthereumService = DI.createInterface<IEthereumService>('EthereumService');

export class EthereumService {
  private web3Modal: Web3Modal;

  constructor(
    @IEventAggregator private readonly eventAggregator: IEventAggregator,
    @ILogger private readonly logger: ILogger,
    @IConfiguration private readonly configuration: IConfiguration,
    @IReadOnlyProvider private readonly readOnlyProvider: IReadOnlyProvider,
  ) {
    this.web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: this.providerOptions, // required
      theme: 'dark',
    });
    this.logger = logger.scopeTo('EthereumService');
  }

  public static register(container: IContainer) {
    Registration.singleton(IEthereumService, EthereumService).register(container);
  }

  private get providerOptions() {
    return {
      'custom-kolektivo': {
        display: {
          logo: 'data:image/gif;base64,R0lGODlhyADIAMIAAP/yAAoKCgAAAcRiAO0cJAAAAAAAAAAAACH5BAEAAAUALAAAAADIAMgAAAP+WLrc/jDKSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru987//AoHBILBqPyKRyyWw6n9CodEqtWq/YrHbL7Xq/4LB4TC6bz+i0es1uu9/wuHxOr9vv+Lx+z+/7/4CBgoOEhYaHiImKi4yNjo+QkZKTlJWWl5iZmpucnZ6foKGio6SlpqeoqaqrrK2ur7CxsrO0tba3uLm6u7y9vr/AwcLDxMXGx8jJysvMzc7P0NHS09TV1tfY2drb3N3e3+Dh4uPk5eaTAukCzOrry+3s6sjtAfUB8MP09vjC+vX8wfzdk/dLoL2B6YAZ3EfQ18J/DXs9ROjOobqDBwGSmHj+ENJEjSM42vN4ESPEhCdE1iOZzuTJiiVUBmApwCVFEO3aAdjJs+fOjo8+RuSQU53PowCAOhKK0kPRdEh9Km3EFCbRp1F7TmWkEylIC12zZt26KKzPrxXMij1KVpFanmgpvF3Ls22iuQDiTsBL1y6Yp4AD28yI1evQvUbprvX7JbDjnIMZFo2q1wFfxT9HnnnMuWZkingrN7iMmbGXzo8/g058VDQD0opNZ5F5ELNtw00jwL4tGwtte7eDwz1smbVwpL2v/K53PLjo3baTW1keoPnt58at19VsRqZW4NrPEi8AXbj02SUjf2cevifa8sHP+04/eH319sNzv86OP/P+ys302WRffzu9x19/8m2BWkvg9WcgVMepBseCnrHn4Hjw2WfThAvWRuCDAjQn4RsUenihfgtkuF1kgJiIn2xmDSDjAPYx4mJ7MBo3I40rzrTIjeHlCOFOO9b4Y4MvcqebjjMaqYiLoR2YlJIQtLPjlTMmqAeUUuIlpABYYqllHlwOKZ6ZTi6ZTphXjolHmSHiFidbVD5gJZtZ1mnIQQT0ScBtfv7ZI4V3iqlnIXz6CaiigxK6Zphu3pFon4tS2qijbEZqx6SCYhaofY4+auh/jgCpXZE8oSqWpn2Yap2qAMAaFat8uNocrLIid6iNSLaHa5OL7fqIarf9KmNfwpaK+lmxwBLZ7FjJNkKsbcbyuGq0vKpH7bO50klqJ7YSmCYn4Yrrn4+elGsurYeoKy67e/ZqrrfogivvvONu4i6B8CJ6L77nguKigD0O7FK+mhhskoZIEhzwJwpjxLCFUy7co8ANH1xwxhY/LIpdIB/qmr6Hhvztfih+XPLKJ6c4HsYtK2ByvShb9UQCADs=',
          name: 'Koletivo Wallet',
          description: 'Connect to your Kolektivo Wallet',
        },
        package: WalletConnectProvider,
        options: {
          // apiKey: 'EXAMPLE_PROVIDER_API_KEY',
          rpc: {
            [this.targetedChainId]: this.configuration.chainUrl,
          },
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        connector: (walletConnectProvider: any, opts?: IWalletConnectConnectorOptions) => this.ConnectToWalletConnect(walletConnectProvider, opts),
      },
      // TODO: test with walletconnect
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          rpc: {
            [this.targetedChainId]: this.configuration.chainUrl,
          },
        },
      },
    };
  }

  public get targetedChainId(): number {
    return this.configuration.chainId;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private ConnectToWalletConnect(walletConnectProvider: any, opts?: IWalletConnectConnectorOptions): Promise<unknown> {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises, no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      let bridge = 'https://bridge.walletconnect.org';
      let qrcode = true;
      let infuraId = '';
      let rpc = undefined;
      let chainId = 1;
      let qrcodeModalOptions = undefined;

      if (opts) {
        bridge = opts.bridge ?? bridge;
        qrcode = typeof opts.qrcode !== 'undefined' ? opts.qrcode : qrcode;
        infuraId = opts.infuraId ?? '';
        rpc = opts.rpc ?? undefined;
        chainId = opts.network && this.targetedChainId ? this.targetedChainId : 1;
        qrcodeModalOptions = opts.qrcodeModalOptions ?? undefined;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const provider = new walletConnectProvider({
        bridge,
        qrcode,
        infuraId,
        rpc,
        chainId,
        qrcodeModalOptions,
      });
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        await provider.enable();
        resolve(provider);
      } catch (e) {
        reject(e);
      }
    });
  }

  public lastBlock?: IBlockInfo;

  public async connect(connectTo?: string): Promise<Web3Provider> {
    return connectTo ? ((await this.web3Modal.connectTo(connectTo)) as Web3Provider) : ((await this.web3Modal.connect()) as Web3Provider);
  }

  public async getMetaMaskProvider() {
    let provider: MetaMaskInpageProvider | null = null;
    provider = (await detectEthereumProvider({ mustBeMetaMask: true })) as MetaMaskInpageProvider;
    if (!(await provider._metamask.isUnlocked())) return;
    if (!((await provider.request({ method: 'eth_accounts' })) as string[]).length) return;
    return provider;
  }

  public async getAccountsForProvider(provider: JsonRpcProvider): Promise<string[]> {
    return Signer.isSigner(provider) ? [await provider.getAddress()] : await provider.listAccounts();
  }

  /**
   *
   * @param web3ModalProvider should be a Web3Provider
   * @returns
   */
  public async switchToTargetedNetwork(web3ModalProvider: Web3Provider) {
    try {
      await web3ModalProvider.provider.request?.({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${this.targetedChainId.toString(16)}` }],
      });
      return web3ModalProvider.provider;
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
      if ((err as any).code !== 4902) return;
      throw new Error(`The ${this.configuration.chain} network is not installed in your Metamask configuration`);
    }
  }

  public async addTokenToMetamask(
    provider: MetaMaskInpageProvider,
    tokenAddress: string,
    tokenSymbol: string,
    tokenDecimals: number,
    tokenImage: string,
  ) {
    try {
      (await provider.request({
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
    } catch (error) {
      this.logger.error(error);
    }
  }

  public async getBlock(blockNumber: number): Promise<IBlockInfo> {
    const block = (await this.readOnlyProvider.getBlock(blockNumber)) as unknown as IBlockInfo;
    block.blockDate = new Date(block.timestamp * 1000);
    return block;
  }

  public getEtherscanLink(addressOrHash?: string, tx = false): string {
    return formatString(this.configuration.scanLink, { type: tx ? 'tx' : 'address', address: addressOrHash });
  }
}
