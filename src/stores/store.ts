import { DI, IContainer, Registration } from 'aurelia';
import { IBlockChainStore } from './block-chain-store';
import { IServices } from 'services';
import { ITreasuryStore } from './treasury-store';

export type IStore = Store;
export const IStore = DI.createInterface<IStore>('Store');

export class Store {
  constructor(
    @IBlockChainStore public readonly blockChainStore: IBlockChainStore,
    @ITreasuryStore public readonly treasuryStore: IBlockChainStore,
    @IServices public readonly services: IServices,
  ) {}

  public static register(container: IContainer): void {
    container.register(Registration.singleton(IStore, Store));
  }

  sideBarOpen = false;
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
