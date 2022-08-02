import './inner-nav.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import template from './inner-nav.html';
@customElement({ name: 'inner-nav', template })
export class InnerNav implements ICustomElementViewModel {
  @bindable routes = [];
}
