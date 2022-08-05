import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter, numberToPixelsInterceptor } from '../../common';

import css from './k-avatar.scss';
import template from './k-avatar.html';

@customElement({
  name: 'k-avatar',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KAvatar implements ICustomElementViewModel {
  @bindable({ set: numberToPixelsInterceptor }) size = '50';
  @bindable color = 'var(--primary)';
  @bindable src?: string;
  @bindable textColor = 'var(--white)';
  @bindable({ set: numberToPixelsInterceptor }) fontSize = '21';

  get divStyle(): Partial<CSSStyleDeclaration> {
    return {
      height: this.size,
      width: this.size,
      overflow: 'hidden',
      backgroundColor: this.color,
      color: this.textColor,
      fontSize: this.fontSize,
    };
  }
}
