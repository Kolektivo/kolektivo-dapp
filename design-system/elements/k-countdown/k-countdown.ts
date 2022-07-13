import { ICustomElementViewModel, bindable } from 'aurelia';
import { numberToPixels } from './../../common';

export class KCountdown implements ICustomElementViewModel {
  @bindable countdown = 5;
  @bindable color = 'var(--primary-text)';
  @bindable finishedColor = 'var(--primary)';
  @bindable finishedIcon = 'check';
  @bindable size = 40;
  interval: NodeJS.Timer;
  currentCount: number;
  hovering = false;

  constructor() {
    // you can inject the element or any DI in the constructor
  }

  binding() {
    this.currentCount = this.countdown;
    this.interval = setInterval(() => {
      if (this.hovering) return;
      this.currentCount--;
      if (this.finished) {
        this.detaching();
      }
    }, 1000);
  }

  get finished() {
    return this.currentCount <= 0;
  }

  get divStyle() {
    return {
      lineHeight: numberToPixels(this.size),
      color: this.finished ? this.finishedColor ?? this.color : this.color,
      height: numberToPixels(this.size),
    };
  }
  mouseEnter() {
    this.hovering = true;
  }
  mouseLeave() {
    this.hovering = false;
  }
  detaching() {
    clearInterval(this.interval);
  }
}
