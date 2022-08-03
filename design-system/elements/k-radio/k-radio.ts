import './k-radio.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { uid } from '../../common';
import template from './k-radio.html';

@customElement({
  name: 'k-radio',
  template,
  capture: true,
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
