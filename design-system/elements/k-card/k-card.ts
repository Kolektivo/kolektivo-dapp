import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';

import css from './k-card.scss';
import template from './k-card.html';

@customElement({
  name: 'k-card',
  template,
  capture: true,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KCard implements ICustomElementViewModel {
  @bindable color = 'var(--white)';

  get style() {
    return {
      backgroundColor: this.color,
    };
  }
}
