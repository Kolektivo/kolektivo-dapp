import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter, ifExistsThenTrue } from '../../common';

import template from './k-input.html';

import css from './k-input.scss';

@customElement({
  name: 'k-input',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KInput implements ICustomElementViewModel {
  @bindable type = 'text';
  @bindable name = '';
  @bindable({ set: ifExistsThenTrue }) multiline = false;
  @bindable({ set: ifExistsThenTrue }) error = false;
  @bindable rows = 4;
  start?: HTMLSlotElement;
  input?: HTMLInputElement;
  startWidth?: number;

  attached(): void | Promise<void> {
    setTimeout(() => (this.startWidth = this.start?.assignedElements()[0]?.clientWidth ?? 0 + 16), 1);
  }
  focusInput(): void {
    this.input?.focus();
  }
  focused(): void {
    this.input?.select();
  }
}
