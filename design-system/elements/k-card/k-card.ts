import { CustomElement, ICustomElementViewModel } from 'aurelia';

export class KCard implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KCard) as { capture: boolean }).capture = true;
