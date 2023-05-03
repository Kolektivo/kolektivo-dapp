import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import template from './inner-nav.html';

import './inner-nav.scss';
@customElement({ name: 'inner-nav', template })
export class InnerNav implements ICustomElementViewModel {
  @bindable routes = [];
  location = window.location;
}
