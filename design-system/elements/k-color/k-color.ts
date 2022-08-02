import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';

import css from './k-color.scss';
import template from './k-color.html';

@customElement({
  name: 'k-color',
  template,
  capture: true,
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
