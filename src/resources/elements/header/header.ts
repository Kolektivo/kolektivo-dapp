import './header.scss';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IState } from './../../../state';
import template from './header.html';
@customElement({ name: 'header', template })
export class Header implements ICustomElementViewModel {
  constructor(@IState private readonly state: IState) {}
  connectWallet(): void {
    alert('Not Implemented');
  }
}
