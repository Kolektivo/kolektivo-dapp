import { DI, IContainer, IEventAggregator, ILogger, Registration } from 'aurelia';

import { formatString } from '../utils';
import { IWalletConnector } from '../wallet-connector';

import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { IConfiguration } from 'configurations/configuration';
import { Signer } from 'ethers';
import { IReadOnlyProvider } from 'read-only-provider';

export type IEthereumService = EthereumService;
export const IEthereumService = DI.createInterface<IEthereumService>('EthereumService');

export class EthereumService {
  constructor(
    @IEventAggregator private readonly eventAggregator: IEventAggregator,
    @ILogger private readonly logger: ILogger,
    @IConfiguration private readonly configuration: IConfiguration,
    @IReadOnlyProvider private readonly readOnlyProvider: IReadOnlyProvider,
    @IWalletConnector private readonly walletConnector: IWalletConnector,
  ) {
    this.logger = logger.scopeTo('EthereumService');
  }

  public static register(container: IContainer) {
    Registration.singleton(IEthereumService, EthereumService).register(container);
  }

  public get targetedChainId(): number {
    return this.configuration.chainId;
  }

  public lastBlock?: IBlockInfo;

  public async connect(connectTo?: string): Promise<Web3Provider> {
    return connectTo ? await this.walletConnector.connectTo(connectTo) : await this.walletConnector.connect();
  }

  public async getMetaMaskProvider() {
    const provider: MetaMaskInpageProvider | null = await detectEthereumProvider({ mustBeMetaMask: true });
    if (!provider) return null;
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

  public async addTokenToMetamask(provider: MetaMaskInpageProvider, tokenAddress: string, tokenSymbol: string, tokenDecimals: number, tokenImage: string) {
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
