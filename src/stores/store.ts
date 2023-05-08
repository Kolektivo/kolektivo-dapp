import { DI, IContainer, Registration } from 'aurelia';

import { AccountStore, IAccountStore } from './account-store';
import { BlockChainStore, IBlockChainStore } from './block-chain-store';
import { ContractStore, IContractStore } from './contract-store';
import { DataStore, IDataStore } from './data-store';
import { GovernanceStore, IGovernanceStore } from './governance-store';
import { IKolektivoStore, KolektivoStore } from './kolektivo-store';
import { IReserveStore, ReserveStore } from './reserve-store';
import { ITreasuryStore, TreasuryStore } from './treasury-store';

export type IStore = Store;
export const IStore = DI.createInterface<IStore>('IStore');

export class Store {
  constructor(
    @IBlockChainStore public readonly blockChainStore: IBlockChainStore,
    @IDataStore public readonly dataStore: IDataStore,
    @IKolektivoStore public readonly kolektivoStore: IKolektivoStore,
    @ITreasuryStore public readonly treasuryStore: ITreasuryStore,
    @IReserveStore public readonly reserveStore: IReserveStore,
    @IContractStore public readonly contractStore: IContractStore,
    @IGovernanceStore public readonly governanceStore: IGovernanceStore,
    @IAccountStore public readonly accountStore: IAccountStore,
  ) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IStore, Store));
    container.register(AccountStore);
    container.register(BlockChainStore);
    container.register(ContractStore);
    container.register(DataStore);
    container.register(GovernanceStore);
    container.register(KolektivoStore);
    container.register(TreasuryStore);
    container.register(ReserveStore);
  }
  pageTitle = '';
  routes: { name: string; path: string }[] = [];
  sideBarOpen = false;
}
