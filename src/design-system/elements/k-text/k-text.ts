import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';

export class KText implements ICustomElementViewModel {
  @bindable tag = '';
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KText) as { capture: boolean }).capture = true;
