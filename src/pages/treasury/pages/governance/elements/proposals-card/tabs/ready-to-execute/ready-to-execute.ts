import './ready-to-execute.scss';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import template from './ready-to-execute.html';

@customElement({ name: 'ready-to-execute', template })
export class ReadyToExecute implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
