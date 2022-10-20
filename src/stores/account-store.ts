import { DI, IContainer, Registration } from 'aurelia';
import { ExternalProvider, JsonRpcProvider, Provider, Web3Provider } from '@ethersproject/providers';
import { IEthereumService } from 'services';
import { IProviderFactory } from '../provider-factory';
import { IReadOnlyProvider } from 'read-only-provider';

export type IAccountStore = AccountStore;
export const IAccountStore = DI.createInterface<IAccountStore>();

export class AccountStore {
  private _web3Provider?: Web3Provider;
  public walletAddress?: string;
  public signer?: ReturnType<JsonRpcProvider['getSigner']>;
  public walletProvider?: Provider;
  public selectedProvider?: Web3Provider;

  public get web3Provider(): Web3Provider | undefined {
    return this._web3Provider;
  }

  public set web3Provider(value: Web3Provider | undefined) {
    this._web3Provider = value;
    void this.setupProvider();
  }

  constructor(
    @IProviderFactory private readonly providerFactory: IProviderFactory,
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IReadOnlyProvider public readonly readonlyProvider: IReadOnlyProvider,
  ) {
    void this.autoConnect();
  }

  private async setupProvider() {
    if (!this.web3Provider) return;
    const accounts = await this.ethereumService.getAccountsForProvider(this.web3Provider);
    this.walletAddress = accounts[0];
    this.signer = this.walletAddress ? this.providerFactory.create(this.walletAddress) : undefined;
    this.walletProvider = this.signer?.provider;
  }

  private addListeners() {
    if (!this.selectedProvider) return;
    this.selectedProvider.on('accountsChanged', this.handleAccountsChanged);
    this.selectedProvider.on('chainChanged', this.handleChainChanged);
    this.selectedProvider.on('disconnect', this.handleDisconnect);
  }

  private removeListeners() {
    if (!this.selectedProvider) return;
    this.selectedProvider.removeListener('accountsChanged', this.handleAccountsChanged);
    this.selectedProvider.removeListener('chainChanged', this.handleChainChanged);
    this.selectedProvider.removeListener('disconnect', this.handleDisconnect);
  }

  private clear() {
    this.removeListeners();
    this.walletAddress = undefined;
    this.walletProvider = undefined;
    this.signer = undefined;
  }

  private handleDisconnect = () => {
    this.walletAddress = undefined;
  };

  private handleChainChanged = (chainId: number) => {
    alert(chainId);
  };

  private handleAccountsChanged = (accounts: string[]) => {
    alert(accounts);
  };

  private async autoConnect() {
    const provider = await this.ethereumService.getMetaMaskProvider();
    if (!provider) return;
    this.selectedProvider = provider as unknown as Web3Provider;
    this.addListeners();
    this.web3Provider = new Web3Provider(this.selectedProvider as unknown as ExternalProvider);
    this.walletAddress = provider.selectedAddress ?? undefined;
  }

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IAccountStore, AccountStore));
  }
}
