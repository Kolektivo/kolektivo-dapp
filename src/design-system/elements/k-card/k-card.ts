import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-card.html';
import css from './k-card.scss?inline';

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
  @bindable textColor = 'var(--white)';
  get style() {
    return {
      color: this.textColor,
      background: this.color,
      borderRadius: this.rounded && `var(--rounded-${this.rounded})`,
      boxShadow: '0px 18px 56px rgba(0, 0, 0, 0.21), 0px 4.02054px 12.5083px rgba(0, 0, 0, 0.125183), 0px 1.19702px 3.72406px rgba(0, 0, 0, 0.0848175)',
    };
  }
}
