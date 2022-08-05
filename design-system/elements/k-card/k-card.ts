import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter } from './../../common';

import css from './k-card.scss';
import template from './k-card.html';

@customElement({
  name: 'k-card',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KCard implements ICustomElementViewModel {
  @bindable color = 'var(--white)';
  @bindable rounded = 6;

  get style() {
    return {
      background: this.color,
      borderRadius: this.rounded && `var(--rounded-${this.rounded})`,
      padding: 'var(--spacing-xl)',
    };
  }
}
