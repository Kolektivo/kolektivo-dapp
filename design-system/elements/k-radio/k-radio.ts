import './k-radio.scss';
import { CustomElement, ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { uid } from '../../common';
import template from './k-radio.html';

@customElement({ name: 'k-radio', template })
export class KRadio implements ICustomElementViewModel {
  @bindable id = uid();
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KRadio) as { capture: boolean }).capture = true;
