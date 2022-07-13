import { ICustomElementViewModel, bindable } from 'aurelia';
import { IfExistsThenTrue } from './../../common';
import { numberToPixels } from '../../../design-system/common';

export class KSpinner implements ICustomElementViewModel {
  @bindable color = 'var(--primary-text)';
  @bindable({ set: IfExistsThenTrue }) paused = false;
  @bindable size = 40;
  @bindable speed = 2;
  @bindable animation = 'spinner';
  @bindable icon = '';

  constructor() {
    // you can inject the element or any DI in the constructor
  }
  get iconStyle() {
    return {
      animation: this.animation && `${this.animation} ${this.speed}s linear infinite reverse`,
      animationPlayState: this.paused && 'paused',
      transform: `rotateY(-180deg) rotateZ(-90deg)`,
    };
  }
  get circleStyle() {
    return {
      stroke: this.color,
      animation: this.animation && `${this.animation} ${this.speed}s linear infinite forwards`,
      animationPlayState: this.paused && 'paused',
      transformOrigin: this.animation === 'spinner' && `20px 20px 0`,
    };
  }
  get svgStyle() {
    return {
      width: numberToPixels(this.size),
      height: numberToPixels(this.size),
      marginTop: this.animation === 'countdown' && numberToPixels(this.size * -1),
      transform: `rotateY(-180deg) rotateZ(-90deg)`,
    };
  }
}
