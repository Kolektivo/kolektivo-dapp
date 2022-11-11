import { bindable, BindingMode, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';
import { ValidationResult } from '@aurelia/validation';

import { captureFilter, ifExistsThenTrue } from '../../common';

import template from './k-form-field.html';

import css from './k-form-field.scss';

@customElement({
  name: 'k-form-field',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KFormField implements ICustomElementViewModel {
  @bindable label = '';
  @bindable max = '';
  @bindable helperText = '';
  @bindable({ set: ifExistsThenTrue }) error = false;
  @bindable errors: ValidationResult[] = [];
  @bindable({ mode: BindingMode.twoWay }) value?: string = '';
  @bindable name = '';

  slot?: HTMLSlotElement;
  input?: HTMLInputElement;

  get maxText(): string {
    return `${this.value?.length ?? 0}/${this.max}`;
  }

  focusInput(): void {
    this.input?.focus();
    (this.slot?.firstElementChild as HTMLInputElement).focus();
  }
}
