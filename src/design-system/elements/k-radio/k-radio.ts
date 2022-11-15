import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import { captureFilter, uid } from '../../common';

import template from './k-radio.html';

import './k-radio.scss';

@customElement({
  name: 'k-radio',
  template,
  capture: captureFilter,
  shadowOptions: {
    mode: 'open',
  },
})
export class KRadio implements ICustomElementViewModel {
  @bindable id = uid();
  input?: HTMLInputElement;

  select(): void {
    this.input?.click();
    this.input?.focus();
  }
}
