import { ICustomElementViewModel, bindable } from 'aurelia';
import { numberToPixels } from './../../common';

export class KCountdown implements ICustomElementViewModel {
  @bindable countdown: number;
  @bindable color = 'var(--primary-text)';
  @bindable finishedColor = 'var(--primary)';
  @bindable finishedIcon = 'check_circle_filled';
  @bindable size = 40;
  interval: NodeJS.Timer;
  currentCount: number;

  constructor() {
    // you can inject the element or any DI in the constructor
  }

  binding() {
    this.currentCount = this.countdown;
    this.interval = setInterval(() => {
      this.currentCount--;
      if (this.finished) {
        this.detaching();
      }
    }, 1000);
  }

  get finished() {
    return this.currentCount <= 0;
  }

  get circleStyle() {
    return {
      stroke: this.finished ? this.finishedColor ?? this.color : this.color,
      animation: !this.finished && `countdown ${this.countdown}s linear infinite forwards`,
    };
  }
  get svgStyle() {
    return {
      width: numberToPixels(this.size),
      height: numberToPixels(this.size),
      marginTop: numberToPixels(this.size * -1),
    };
  }

  get divStyle() {
    return {
      lineHeight: numberToPixels(this.size),
      color: this.finished ? this.finishedColor ?? this.color : this.color,
    };
  }

  detaching() {
    clearInterval(this.interval);
  }
}
