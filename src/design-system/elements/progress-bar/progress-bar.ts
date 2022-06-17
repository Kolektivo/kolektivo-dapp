import { alias } from "@aurelia/runtime";
import { bindable } from "aurelia";
import { Prefix } from "../../config";


@alias(Prefix + 'progress-bar')
export class ProgressBar {
  @bindable({ type: Number }) public max: number = 100;
  @bindable({ type: Number }) public current: number = 0;
  @bindable({ type: Number }) public percent?: number;
  @bindable public color?: string;

  constructor() {
    console.log(this.percent);
    // you can inject the element or any DI in the constructor
  }

  attached() {
    console.log(this.percent);
  }

  get progressBarStyle() {
    return `width:${this.percent || ((this.current / this.max) * 100)}%;background-color:${this.color}`;
  }

}
