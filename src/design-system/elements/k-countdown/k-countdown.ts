import { bindable, customElement, ICustomElementViewModel, IPlatform, shadowCSS, Task } from 'aurelia';

import { captureFilter, ifExistsThenTrue, numberToPixels } from '../../common';

import template from './k-countdown.html';

import css from './k-countdown.scss';

@customElement({
  name: 'k-countdown',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KCountdown implements ICustomElementViewModel {
  @bindable countdown = 5;
  @bindable color?: string = 'var(--primary-text)';
  @bindable finishedColor?: string = 'var(--primary)';
  @bindable icon = 'check';
  @bindable size = 40;
  @bindable({ set: ifExistsThenTrue }) hovering = false;
  @bindable({ set: ifExistsThenTrue }) inheritHover = false;
  task?: Task;
  currentCount: number = this.countdown;

  constructor(@IPlatform private readonly platform: IPlatform) {
    // you can inject the element or any DI in the constructor
  }

  binding(): void {
    this.currentCount = this.countdown;
    this.task = this.platform.taskQueue.queueTask(
      () => {
        if (this.hovering) return;
        this.currentCount -= 1;
        if (this.currentCount <= 0) {
          this.detaching();
        }
      },
      { delay: 1000, persistent: true /* runs until canceled */ },
    );
  }

  get finished(): boolean {
    return this.currentCount <= 0;
  }

  get divStyle(): Record<string, unknown> {
    return {
      lineHeight: numberToPixels(this.size),
      color: this.finished ? this.finishedColor ?? this.color : this.color,
      height: numberToPixels(this.size),
    };
  }
  mouseEnter(): void {
    this.hovering = true;
  }
  mouseLeave(): void {
    this.hovering = false;
  }
  detaching(): void {
    this.task?.cancel();
  }
}
