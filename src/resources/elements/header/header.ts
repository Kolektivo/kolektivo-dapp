import './header.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IState } from './../../../state';
import template from './header.html';
@customElement({ name: 'header', template })
export class Header implements ICustomElementViewModel {
  blockChainState: BlockChainState;
  constructor(@IState private readonly state: IState) {
    this.blockChainState = state.blockChainState;
  }
  connectWallet(): void {
    alert('Not Implemented');
  }
}
