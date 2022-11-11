import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-color.html';

import css from './k-color.scss';

@customElement({
  name: 'k-color',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KColor implements ICustomElementViewModel {
  @bindable var?: string;
  copyCode(): void {
    this.var && void navigator.clipboard.writeText(`var(--${this.var})`);
  }
}
