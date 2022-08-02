import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { numberToPixelsInterceptor } from '../../common';
import css from './k-backdrop.scss';
import template from './k-backdrop.html';

@customElement({
  name: 'k-backdrop',
  template,
  capture: true,
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
