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
      boxShadow: '0px 36px 60px rgba(0, 0, 0, 0.06), 0px 8px 14px rgba(0, 0, 0, 0.0298054), 0px 2.5px 4px rgba(0, 0, 0, 0.0201946)',
    };
  }
}
