import './treasury.scss';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './treasury.html';

@customElement({ name: 'treasury', template })
export class Treasury implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
