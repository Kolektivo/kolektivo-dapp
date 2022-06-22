import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';

export class KInput implements ICustomElementViewModel {
  @bindable type = 'text';
  @bindable name = '';

  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KInput) as { capture: boolean }).capture = true;
