import { customElement, ICustomElementViewModel } from 'aurelia';

import template from './header.html';

import './header.scss';

import { IBlockChainStore, IKolektivoStore } from 'stores';
@customElement({ name: 'header', template })
export class Header implements ICustomElementViewModel {
  public badgeTarget?: HTMLElement;
  constructor(
    @IBlockChainStore private readonly blockChainStore: IBlockChainStore,
    @IKolektivoStore private readonly kolektivoStore: IKolektivoStore,
  ) {}

  get pendingTransactions(): number {
    return this.kolektivoStore.transactions.filter((x) => x.status === 'pending').length;
  }

  connectWallet(): void {
    void this.blockChainStore.connect();
  }

  connectKolektivoWallet() {
    this.blockChainStore.connectKolektivoWallet();
  }
}
