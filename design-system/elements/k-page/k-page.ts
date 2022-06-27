import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';

export class KPage implements ICustomElementViewModel {
  @bindable title?: string;
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KPage) as { capture: boolean }).capture = true;
