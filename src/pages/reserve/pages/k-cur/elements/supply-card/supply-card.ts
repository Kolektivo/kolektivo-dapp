import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './supply-card.html';

@customElement({ name: 'supply-card', template })
export class SupplyCard implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
