import './header.scss';
import { BlockChainState, IState } from './../../../state';
import { ICustomElementViewModel, customElement } from 'aurelia';
import template from './header.html';
@customElement({ name: 'header', template })
export class Header implements ICustomElementViewModel {
  public badgeTarget?: HTMLElement;
  blockChainState: BlockChainState;
  constructor(@IState private readonly state: IState) {
    this.blockChainState = state.blockChainState;
  }
  connectWallet(): void {
    alert('Not Implemented');
  }
}
