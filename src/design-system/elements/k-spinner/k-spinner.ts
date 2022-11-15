import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import template from './k-spinner.html';

import css from './k-spinner.scss';

import { captureFilter, ifExistsThenTrue, numberToPixels, numberToPixelsInterceptor } from 'design-system/common';

@customElement({
  name: 'k-spinner',
  template,
  dependencies: [shadowCSS(css)],
  capture: captureFilter,
  shadowOptions: {
    mode: 'open',
  },
})
export class KSpinner implements ICustomElementViewModel {
  @bindable color = 'var(--primary-text)';
  @bindable({ set: ifExistsThenTrue }) paused = false;
  @bindable size = 40;
  @bindable speed = 2;
  @bindable({ set: numberToPixelsInterceptor }) thickness = 3;
  @bindable animation = 'spinner';
  @bindable icon = '';

  get iconStyle(): Record<string, unknown> {
    return {
      animation: this.animation && `${this.animation} ${this.speed}s linear infinite reverse`,
      animationPlayState: this.paused && 'paused',
      transform: 'rotateY(-180deg) rotateZ(-90deg)',
    };
  }
  get circleStyle(): Record<string, unknown> {
    return {
      stroke: this.color,
      strokeWidth: this.thickness,
      animation: this.animation && `${this.animation} ${this.speed}s linear infinite forwards`,
      animationPlayState: this.paused && 'paused',
      transformOrigin: this.animation === 'spinner' && `20px 20px 0`,
    };
  }
  get svgStyle(): Record<string, unknown> {
    return {
      width: numberToPixels(this.size),
      height: numberToPixels(this.size),
      marginTop: this.animation === 'countdown' && numberToPixels(this.size * -1),
      transform: 'rotateY(-180deg) rotateZ(-90deg)',
    };
  }
}
