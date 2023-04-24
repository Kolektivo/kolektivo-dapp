import { customElement, ICustomElementViewModel } from 'aurelia';

import { IBlockChainStore } from '../../../stores';

import { IAccountStore } from './../../../stores/account-store';
import { IKolektivoStore } from './../../../stores/kolektivo-store';
import template from './header.html';

import './header.scss';

@customElement({ name: 'header', template })
export class Header implements ICustomElementViewModel {
  public badgeTarget?: HTMLElement;
  constructor(
    @IBlockChainStore private readonly blockChainStore: IBlockChainStore,
    @IAccountStore private readonly accountStore: IAccountStore,
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
