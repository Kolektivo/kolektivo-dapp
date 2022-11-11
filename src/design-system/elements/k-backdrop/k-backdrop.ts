import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter, numberToPixelsInterceptor } from '../../common';

import template from './k-backdrop.html';

import css from './k-backdrop.scss';

@customElement({
  name: 'k-backdrop',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KBackdrop implements ICustomElementViewModel {
  @bindable({ set: numberToPixelsInterceptor }) blur = 0;
  @bindable opacity = 1;
  @bindable color = 'var(--san-juan-500)';

  get style() {
    return {
      backdropFilter: `blur(${this.blur})`,
      opacity: this.opacity,
      backgroundColor: !this.blur && this.color,
    };
  }
}
