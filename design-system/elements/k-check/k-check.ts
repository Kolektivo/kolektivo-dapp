import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { uid } from '../../common';

export class KCheck implements ICustomElementViewModel {
  @bindable id = uid();
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
(CustomElement.getDefinition(KCheck) as { capture: boolean }).capture = true;
