import { BindingMode, CustomElement, ICustomElementViewModel, bindable } from 'aurelia';
import { DisplayValue } from './../../common';

export class KRadioGroup implements ICustomElementViewModel {
  @bindable({ mode: BindingMode.twoWay }) value: DisplayValue[] = [];
  @bindable name: string;
  @bindable items: DisplayValue[];
  constructor() {
    // you can inject the element or any DI in the constructor
  }

  radioChanged(item: DisplayValue, element: HTMLInputElement) {
    console.log(item);
    if (!Array.isArray(this.value)) return;
    const index = this.value.findIndex(x => x === item);
    if (element.checked && index === -1) {
      this.value.push(item);
    } else {
      this.value.splice(index, 1);
    }
  }
}
(CustomElement.getDefinition(KRadioGroup) as { capture: boolean }).capture = true;
