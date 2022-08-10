import './card-nav.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import template from './card-nav.html';

@customElement({ name: 'card-nav', template })
export class CardNav implements ICustomElementViewModel {
  @bindable routes = [];
}
