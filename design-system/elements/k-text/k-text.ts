import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { numberToPixels } from './../../common';

export class KText implements ICustomElementViewModel {
  @bindable tag = '';
  @bindable color = '';
  @bindable size: string | number = undefined;
  constructor() {
    // you can inject the element or any DI in the constructor
  }

  get styles() {
    return { color: this.color, fontSize: numberToPixels(this.size) };
  }
}
(CustomElement.getDefinition(KText) as { capture: boolean }).capture = true;
