import { Badge } from 'models/badge';
import { BadgeType } from 'models/badge-type';
import { Badger } from 'models/generated/governance/badger';
import { BigNumber } from 'ethers';
import { DI, IContainer, Registration } from 'aurelia';
import { IContractService } from 'services/contract/contract-service';
import { IEthereumService } from 'services/ethereum-service';
import { IProviderFactory } from '../provider-factory';
import { IReadOnlyProvider } from 'read-only-provider';
import { JsonRpcProvider, Provider, Web3Provider } from '@ethersproject/providers';
import { allBadges } from './kolektivo-store';

export type IAccountStore = AccountStore;
export const IAccountStore = DI.createInterface<IAccountStore>();

export class AccountStore {
  public walletAddress?: string;
  public signer?: ReturnType<JsonRpcProvider['getSigner']>;
  public provider?: Provider;
  public badges: Badge[] = [];

  constructor(
    @IProviderFactory private readonly providerFactory: IProviderFactory,
    @IEthereumService private readonly ethereumService: IEthereumService,
    @IReadOnlyProvider public readonly readonlyProvider: IReadOnlyProvider,
    @IContractService private readonly contractService: IContractService,
  ) {}

  public disconnect() {
    this.provider = undefined;
    this.signer = undefined;
    this.walletAddress = undefined;
    this.badges = [];
  }

  public async connect(web3Provider?: Web3Provider) {
    if (!web3Provider) {
      this.disconnect();
      return;
    }

    const accounts = await this.ethereumService.getAccountsForProvider(web3Provider);
    this.walletAddress = accounts[0];
    this.signer = this.walletAddress ? this.providerFactory.create(this.walletAddress) : undefined;
    this.provider = this.signer?.provider;
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
