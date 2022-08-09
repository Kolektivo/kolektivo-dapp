import './header.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IState } from './../../../state';
import template from './header.html';
@customElement({ name: 'header', template })
export class Header implements ICustomElementViewModel {
  public badgeTarget?: HTMLElement;
  blockChainState: BlockChainState;
  constructor(@IState private readonly state: IState) {
    this.blockChainState = state.blockChainState;
  }
  get pendingTransactions(): number {
    return this.blockChainState.transactions.filter((x) => x.status === 'pending').length;
  }
  connectWallet(): void {
    alert('Not Implemented');
  }
}
