import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import template from './k-tooltip.html';

@customElement({ name: 'k-tooltip', template })
export class KTooltip implements ICustomElementViewModel {
  @bindable message: string;
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
