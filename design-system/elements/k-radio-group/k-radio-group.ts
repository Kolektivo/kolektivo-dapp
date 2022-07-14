import { BindingMode, CustomElement, ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { DisplayValue } from './../../common';
import template from './k-radio-group.html';

@customElement({ name: 'k-radio-group', template })
export class KRadioGroup implements ICustomElementViewModel {
  @bindable({ mode: BindingMode.twoWay }) value: DisplayValue;
  @bindable name: string;
  @bindable items: DisplayValue[];
  constructor() {
    // you can inject the element or any DI in the constructor
  }

  radioChanged(_item: DisplayValue, _element: HTMLInputElement) {}
}
(CustomElement.getDefinition(KRadioGroup) as { capture: boolean }).capture = true;
