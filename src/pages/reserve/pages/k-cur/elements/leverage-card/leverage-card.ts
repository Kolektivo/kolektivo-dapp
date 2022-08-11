import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './leverage-card.html';

@customElement({ name: 'leverage-card', template })
export class LeverageCard implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
