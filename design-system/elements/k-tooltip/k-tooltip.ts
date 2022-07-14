import { ICustomElementViewModel, bindable } from 'aurelia';
import { numberToPixels } from './../../common';
export class KTooltip implements ICustomElementViewModel {
  @bindable message: string;
  @bindable({ set: numberToPixels }) top = 0;
  @bindable({ set: numberToPixels }) bottom = 0;
  @bindable({ set: numberToPixels }) right = 0;
  @bindable({ set: numberToPixels }) left = 0;
  constructor(private readonly element: HTMLElement) {
    // you can inject the element or any DI in the constructor
  }

  get style() {
    return {
      top: this.top,
      left: this.left,
    };
  }
}
