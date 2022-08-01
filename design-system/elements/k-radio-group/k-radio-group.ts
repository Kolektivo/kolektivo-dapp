import { BindingMode, ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { DisplayValue } from './../../common';
import template from './k-radio-group.html';

@customElement({
  name: 'k-radio-group',
  template,
  capture: true,
  shadowOptions: {
    mode: 'open',
  },
})
export class KRadioGroup implements ICustomElementViewModel {
  @bindable({ mode: BindingMode.twoWay }) value?: DisplayValue;
  @bindable name?: string;
  @bindable items?: DisplayValue[];
}
