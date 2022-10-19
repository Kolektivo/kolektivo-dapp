import { BlockChainStore, IBlockChainStore } from './block-chain-store';
import { ContractStore, IContractStore } from './contract-store';
import { DI, IContainer, Registration } from 'aurelia';
import { DataStore, IDataStore } from './data-store';
import { GovernanceStore, IGovernanceStore } from './governance-store';
import { IKolektivoStore, KolektivoStore } from './kolektivo-store';
import { IReserveStore, ReserveStore } from './reserve-store';
import { IServices } from '../services';
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
    @IGovernanceStore private readonly governanceStore: IGovernanceStore,
    @IServices private readonly services: IServices,
  ) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IStore, Store));
    container.register(BlockChainStore);
    container.register(DataStore);
    container.register(KolektivoStore);
    container.register(TreasuryStore);
    container.register(ReserveStore);
    container.register(ContractStore);
    container.register(GovernanceStore);
  }

  initializeServices() {
    return this.services.initialize();
  }

  sideBarOpen = false;
}
