import './k-radio.scss';
import { CustomElement, ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { uid } from '../../common';
import template from './k-radio.html';

@customElement({ name: 'k-radio', template })
export class KRadio implements ICustomElementViewModel {
  @bindable id = uid();
  input: HTMLInputElement;
  constructor() {
    // you can inject the element or any DI in the constructor
  }
  select(): void {
    this.input.click();
    this.input.focus();
  }
}
(CustomElement.getDefinition(KRadio) as { capture: boolean }).capture = true;
