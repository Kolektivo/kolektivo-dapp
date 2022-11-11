import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-card.html';

import css from './k-card.scss';

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
  @bindable color = 'var(--card-bg, var(--white))';
  @bindable rounded = 6;
  @bindable title?: string;
  @bindable titleAvatar?: string;
  @bindable tooltipText?: string;
  get style() {
    return {
      background: this.color,
      borderRadius: this.rounded && `var(--rounded-${this.rounded})`,
    };
  }
}
