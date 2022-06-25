import { CustomElement, ICustomElementViewModel } from 'aurelia';

export class KAccordion implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KAccordion) as { capture: boolean }).capture = true;
