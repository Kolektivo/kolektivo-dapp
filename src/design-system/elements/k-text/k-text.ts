import { bindable, CustomElement, ICustomElementViewModel } from 'aurelia';

export class KText implements ICustomElementViewModel {
  @bindable tag = 'h1';
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KText) as { capture: boolean }).capture = true;
