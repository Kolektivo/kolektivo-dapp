import { Badge } from 'models/badge';
import { BadgeType } from 'models/badge-type';
import { Badger } from 'models/generated/governance/badger';
import { BigNumber } from 'ethers';
import { DI, IContainer, Registration } from 'aurelia';
import { ExternalProvider, JsonRpcProvider, Provider, Web3Provider } from '@ethersproject/providers';
import { IContractService, IEthereumService } from 'services';
import { IProviderFactory } from '../provider-factory';
import { IReadOnlyProvider } from 'read-only-provider';
import { allBadges } from './kolektivo-store';

export type IAccountStore = AccountStore;
export const IAccountStore = DI.createInterface<IAccountStore>();

export class AccountStore {
  private _web3Provider?: Web3Provider;
  public walletAddress?: string;
  public signer?: ReturnType<JsonRpcProvider['getSigner']>;
  public walletProvider?: Provider;
  public selectedProvider?: Web3Provider;
  public badges: Badge[] = [];

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
    @IContractService private readonly contractService: IContractService,
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

  private handleAccountsChanged = (accounts?: string[]) => {
    this.walletAddress = accounts?.[0];
    void this.loadBadges();
  };

  private async autoConnect() {
    const provider = await this.ethereumService.getMetaMaskProvider();
    if (!provider) return;
    this.selectedProvider = provider as unknown as Web3Provider;
    this.addListeners();
    this.web3Provider = new Web3Provider(this.selectedProvider as unknown as ExternalProvider);
    this.walletAddress = provider.selectedAddress ?? undefined;
    void this.loadBadges();
  }

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IAccountStore, AccountStore));
  }

  public async loadBadges(): Promise<void> {
    const contract = this.getBadgerContract();
    if (!this.walletAddress) return;
    const badgeNumbers = Object.values(BadgeType)
      .filter((y) => typeof y === 'number')
      .map((y) => y as number);

    const badges = (
      await Promise.all(
        badgeNumbers.map(async (x) => {
          const balance = await contract.balanceOf(this.walletAddress ?? '', BigNumber.from(x));
          if (Number(balance) !== 1) return;
          return x;
        }),
      )
    ).filter(Boolean);
    this.badges = allBadges.filter((x) => badges.some((y) => y === x.type));
  }

  private getBadgerContract(): Badger {
    return this.contractService.getContract('Governance', 'monetaryBadger');
  }
}
