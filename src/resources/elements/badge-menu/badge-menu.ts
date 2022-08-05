import './badge-menu.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IState } from '../../../../src/state';
import template from './badge-menu.html';

@customElement({
  name: 'badge-menu',
  template,
  capture: true,
})
export class BadgeMenu implements ICustomElementViewModel {
  blockChainState: BlockChainState;
  constructor(@IState private readonly state: IState) {
    this.blockChainState = state.blockChainState;
  }
}
