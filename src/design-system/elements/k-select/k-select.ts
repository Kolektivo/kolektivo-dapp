import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
export class KSelect implements ICustomElementViewModel {
  @bindable options = [];
  @bindable allowEmpty = true;
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KSelect) as { capture: boolean }).capture = true;
