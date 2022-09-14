import './history.scss';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './history.html';

@customElement({ name: 'history', template })
export class History implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
