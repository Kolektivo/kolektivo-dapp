import { ICustomElementViewModel, bindable } from 'aurelia';

export class KColor implements ICustomElementViewModel {
  @bindable var;
  constructor() {
    // you can inject the element or any DI in the constructor
  }
  copyCode() {
    navigator.clipboard.writeText(`var(--${this.var})`);
  }
}
