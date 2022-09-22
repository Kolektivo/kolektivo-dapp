import './header.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IStore } from '../../../stores/store';
import template from './header.html';
@customElement({ name: 'header', template })
export class Header implements ICustomElementViewModel {
  public badgeTarget?: HTMLElement;
  constructor(@IStore private readonly store: IStore) {}

  get pendingTransactions(): number {
    return this.store.kolektivoStore.transactions.filter((x) => x.status === 'pending').length;
  }

  connectWallet(): void {
    this.store.blockChainStore.connect();
  }

  connectKolektivoWallet() {
    this.store.blockChainStore.connectKolektivoWallet();
  }
}
