import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';

export class KText implements ICustomElementViewModel {
  @bindable tag = '';
  @bindable color = '';
  constructor() {
    // you can inject the element or any DI in the constructor
  }

  get styles() {
    return { color: this.color };
  }
}
(CustomElement.getDefinition(KText) as { capture: boolean }).capture = true;
