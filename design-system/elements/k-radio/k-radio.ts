import { CustomElement, ICustomElementViewModel } from 'aurelia';

export class KRadio implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KRadio) as { capture: boolean }).capture = true;
