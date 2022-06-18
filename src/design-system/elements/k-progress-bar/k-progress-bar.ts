import { CustomElement, bindable } from 'aurelia';

export class KProgressBar {
  @bindable public max?: number = 100;
  @bindable public current?: number = 0;
  @bindable public percent?: number;
  @bindable public color?: string;

  constructor() {
    console.log(this.percent);
    // you can inject the element or any DI in the constructor
  }

  attached() {
    console.log(this.percent);
  }

  get progressBarStyle() {
    return `width:${this.percent || (this.current / this.max) * 100}%;background-color:${this.color}`;
  }
}
(CustomElement.getDefinition(KProgressBar) as { capture: boolean }).capture = true;
