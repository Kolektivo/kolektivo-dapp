import { CustomElement, ICustomElementViewModel } from 'aurelia';

export class KInput implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KInput) as { capture: boolean }).capture = true;
