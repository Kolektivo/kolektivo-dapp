import { BlockChainStore, IBlockChainStore } from './block-chain-store';
import { DI, IContainer, Registration } from 'aurelia';
import { IKolektivoStore, KolektivoStore } from './kolektivo-store';
import { IServices } from '../services';
import { ITreasuryStore, TreasuryStore } from './treasury-store';

export type IStore = Store;
export const IStore = DI.createInterface<IStore>('IStore');

export class Store {
  constructor(
    @IBlockChainStore public readonly blockChainStore: IBlockChainStore,
    @IKolektivoStore public readonly kolektivoStore: IKolektivoStore,
    @ITreasuryStore public readonly treasuryStore: ITreasuryStore,
    @IServices public readonly services: IServices,
  ) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IStore, Store));
    container.register(BlockChainStore);
    container.register(KolektivoStore);
    container.register(TreasuryStore);
  }

  sideBarOpen = false;

  kCur: TokenInfo = {
    marketCap: 4000000,
    currentPrice: 0.98,
    totalSupply: 8000000,
    supplyDistribution: {
      treasury: 40,
      reserves: 40,
      circulating: 10,
      circulatingExternal: 10,
    },
  };

  kGuilder: TokenInfo = {
    marketCap: 5000000,
    currentPrice: 12.98,
    totalSupply: 8000000,
  };

  tokenInfo: TokenInfo = {
    marketCap: 3000000,
    currentPrice: 0.98,
    totalSupply: 8000000,
    supplyDistribution: {
      treasury: 40,
      reserves: 40,
      circulating: 20,
    },
  };
}
