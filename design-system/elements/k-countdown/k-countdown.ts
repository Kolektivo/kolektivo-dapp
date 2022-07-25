import { ICustomElementViewModel, IPlatform, Task, bindable } from 'aurelia';
import { IfExistsThenTrue, numberToPixels } from './../../common';

export class KCountdown implements ICustomElementViewModel {
  @bindable countdown = 5;
  @bindable color = 'var(--primary-text)';
  @bindable finishedColor = 'var(--primary)';
  @bindable icon = 'check';
  @bindable size = 40;
  @bindable({ set: IfExistsThenTrue }) hovering = false;
  @bindable({ set: IfExistsThenTrue }) inheritHover = false;
  task: Task;
  currentCount: number;

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
      { delay: 1000, persistent: true /* runs until canceled */ }
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
    this.task.cancel();
  }
}
