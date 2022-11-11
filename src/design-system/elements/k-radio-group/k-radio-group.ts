import { bindable, BindingMode, customElement, ICustomElementViewModel } from 'aurelia';

import { type DisplayValue, captureFilter } from '../../common';

import template from './k-radio-group.html';

@customElement({
  name: 'k-radio-group',
  template,
  capture: captureFilter,
  shadowOptions: {
    mode: 'open',
  },
})
export class KRadioGroup implements ICustomElementViewModel {
  @bindable({ mode: BindingMode.twoWay }) value?: DisplayValue;
  @bindable name?: string;
  @bindable items?: DisplayValue[];
}
