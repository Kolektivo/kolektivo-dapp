import { CustomElement, ICustomElementViewModel } from 'aurelia';

export class KPage implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KPage) as { capture: boolean }).capture = true;
