import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter, numberToPixelsInterceptor } from '../../common';

import template from './k-avatar.html';

import css from './k-avatar.scss';

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
  @bindable color?: string;
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
  get imageStyle(): Partial<CSSStyleDeclaration> {
    return {
      height: this.size,
      width: this.size,
    };
  }
}
