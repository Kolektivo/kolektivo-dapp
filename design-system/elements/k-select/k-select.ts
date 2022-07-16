import { CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
export class KSelect implements ICustomElementViewModel {
  @bindable options = [];
  @bindable placeholder: string;
  private dropdown: HTMLSelectElement;
  constructor() {
    // you can inject the element or any DI in the constructor
  }
  changed() {
    (document.activeElement as HTMLElement).blur();
  }
}
(CustomElement.getDefinition(KSelect) as { capture: boolean }).capture = true;
