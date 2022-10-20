import { DI, IContainer, Registration } from 'aurelia';
import { IEthereumService } from 'services';
import { IProviderFactory } from '../provider-factory';
import { JsonRpcSigner, Provider, Web3Provider } from '@ethersproject/providers/lib';

export type IAccountStore = AccountStore;
export const IAccountStore = DI.createInterface<IAccountStore>();

export class AccountStore {
  private _web3Provider?: Web3Provider;
  public walletAddress?: string;
  public signer?: JsonRpcSigner;
  public walletProvider?: Provider;

  public get web3Provider(): Web3Provider | undefined {
    return this._web3Provider;
  }

  public set web3Provider(value: Web3Provider | undefined) {
    if (value === undefined) {
      this.clear();
    }

    this._web3Provider = value;
    void this.setupProvider();
    this.addListeners();
  }

  constructor(
    @IProviderFactory private readonly providerFactory: IProviderFactory,
    @IEthereumService private readonly ethereumService: IEthereumService,
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
    if (!this.web3Provider) return;
    this.web3Provider.on('accountsChanged', this.handleAccountsChanged);
    this.web3Provider.on('chainChanged', this.handleChainChanged);
    this.web3Provider.on('disconnect', this.handleDisconnect);
  }

  private removeListeners() {
    if (!this.web3Provider) return;
    this.web3Provider.removeListener('accountsChanged', this.handleAccountsChanged);
    this.web3Provider.removeListener('chainChanged', this.handleChainChanged);
    this.web3Provider.removeListener('disconnect', this.handleDisconnect);
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
    this.web3Provider = new Web3Provider(provider as ExternalProvider);

    this.walletAddress = provider.selectedAddress;
  }

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IAccountStore, AccountStore));
  }
}
