import { AllowedNetworks } from 'models/allowed-network';
import { DI, IContainer, Registration } from 'aurelia';
import { IAccountStore } from './account-store';
import { IConfiguration } from 'configurations/configuration';
import { IEthereumService } from '../services';
import { Web3Provider } from '@ethersproject/providers';

export type IBlockChainStore = BlockChainStore;
export const IBlockChainStore = DI.createInterface<IBlockChainStore>('BlockChainStore');

export class BlockChainStore {
  public provider?: Web3Provider;
  public walletProvider?: Web3Provider;

  constructor(
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IConfiguration private readonly configuration: IConfiguration,
    @IAccountStore private readonly accountStore: IAccountStore,
  ) {
    void this.autoConnect();
  }

  private async autoConnect() {
    const provider = await this.ethereumService.getMetaMaskProvider();
    provider && void this.connect(provider as unknown as Web3Provider);
  }

  private addListeners() {
    if (!this.provider) return;
    this.provider.on('accountsChanged', this.handleAccountsChanged);
    this.provider.on('chainChanged', this.handleChainChanged);
    this.provider.on('disconnect', this.handleDisconnect);
  }

  private removeListeners() {
    if (!this.provider) return;
    this.provider.removeListener('accountsChanged', this.handleAccountsChanged);
    this.provider.removeListener('chainChanged', this.handleChainChanged);
    this.provider.removeListener('disconnect', this.handleDisconnect);
  }

  private handleDisconnect = () => {
    this.walletProvider = undefined;
    this.accountStore.walletAddress = undefined;
  };

  private handleChainChanged = (chainId: number) => {
    alert(chainId);
  };

  private handleAccountsChanged = (accounts?: string[]) => {
    this.accountStore.walletAddress = accounts?.[0];
    void this.accountStore.loadBadges();
  };

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IBlockChainStore, BlockChainStore));
  }

  public get targetedNetwork(): AllowedNetworks {
    return this.configuration.chain;
  }

  public get walletConnected(): boolean {
    return !!this.accountStore.walletAddress;
  }

  public async connect(web3Provider?: Web3Provider) {
    const provider = web3Provider ?? (await this.ethereumService.connect());
    this.removeListeners();
    this.provider = provider;
    this.addListeners();
    void this.accountStore.connect(this.provider);
  }

  public connectKolektivoWallet(): void {
    //
  }

  public connectToConnectedProvider() {
    return this.ethereumService.getMetaMaskProvider();
  }

  public switchToTargetedNetwork() {
    if (!this.walletProvider) return;
    return this.ethereumService.switchToTargetedNetwork(this.walletProvider);
  }

  public disconnect(): void {
    void this.accountStore.connect(undefined);
    this.provider = undefined;
  }

  public getEtherscanLink(addressOrHash: string, tx = false): string {
    return this.ethereumService.getEtherscanLink(addressOrHash, tx);
  }

  public get connectedWalletEtherscanLink(): string {
    return this.ethereumService.getEtherscanLink(this.accountStore.walletAddress);
  }
}
