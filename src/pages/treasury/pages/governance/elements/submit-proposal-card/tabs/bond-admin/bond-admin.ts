import './bond-admin.scss';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './bond-admin.html';

@customElement({ name: 'bond-admin', template })
export class BondAdmin implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
