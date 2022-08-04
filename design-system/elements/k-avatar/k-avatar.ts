import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';

import css from './k-avatar.scss';
import template from './k-avatar.html';

@customElement({
  name: 'k-avatar',
  template,
  capture: true,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KAvatar implements ICustomElementViewModel {
  @bindable size = 50;
  @bindable color = 'var(--white)';
  @bindable src?: string;

  get divStyle(): Partial<CSSStyleDeclaration> {
    return {
      height: `${this.size}px`,
      width: `${this.size}px`,
      overflow: 'hidden',
      backgroundColor: this.color,
    };
  }
}
