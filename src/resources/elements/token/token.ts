import './token.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import template from './token.html';

@customElement({ name: 'token', template })
export class Token implements ICustomElementViewModel {
  @bindable icon = 'https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579';
  @bindable size = 24;
  @bindable name = 'Bitcoin';
}
