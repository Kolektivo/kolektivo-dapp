import './header.scss';
import { IBlockChainStore } from '../../../stores';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './header.html';
@customElement({ name: 'header', template })
export class Header implements ICustomElementViewModel {
  public badgeTarget?: HTMLElement;
  constructor(@IBlockChainStore private readonly blockChainStore: IBlockChainStore) {}

  get pendingTransactions(): number {
    return this.blockChainStore.transactions.filter((x) => x.status === 'pending').length;
  }

  connectWallet(): void {
    this.blockChainStore.walletConnected = true;
  }
}
