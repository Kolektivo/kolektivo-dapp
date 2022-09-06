import { BlockChainStore, IBlockChainStore } from './block-chain-store';
import { DI, IContainer, Registration } from 'aurelia';
import { IKolektivoStore, KolektivoStore } from './kolektivo-store';
import { IReserveStore, ReserveStore } from './reserve-store';
import { IServices } from '../services';
import { ITreasuryStore, TreasuryStore } from './treasury-store';

export type IStore = Store;
export const IStore = DI.createInterface<IStore>('IStore');

export class Store {
  constructor(
    @IBlockChainStore public readonly blockChainStore: IBlockChainStore,
    @IKolektivoStore public readonly kolektivoStore: IKolektivoStore,
    @ITreasuryStore public readonly treasuryStore: ITreasuryStore,
    @IReserveStore public readonly reserveStore: IReserveStore,
    @IServices private readonly services: IServices,
  ) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IStore, Store));
    container.register(BlockChainStore);
    container.register(KolektivoStore);
    container.register(TreasuryStore);
    container.register(ReserveStore);
  }

  initializeServices() {
    return this.services.initialize();
  }

  sideBarOpen = false;
}
