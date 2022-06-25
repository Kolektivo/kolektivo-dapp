import { ICustomElementViewModel, bindable } from 'aurelia';

export class KGrid implements ICustomElementViewModel {
  @bindable({ type: Number }) rows: number;
  @bindable rowStyle: string;
  @bindable({ type: Number }) columns: number;
  @bindable columnStyle: string;
  @bindable({ type: Number }) gap: number;
  @bindable({ type: Number }) rowGap: number;
  @bindable({ type: Number }) columnGap: number;
  constructor() {
    // you can inject the element or any DI in the constructor
  }

  get gridStyles() {
    return {
      'grid-template-rows': (this.rows && `repeat(1fr, ${this.rows})`) || this.rowStyle,
      'grid-template-columns': (this.rows && `repeat(1fr, ${this.columns})`) || this.columnStyle,
      gap: this.gap ? `${this.gap}px` : undefined,
      'row-gap': this.rowGap ? `${this.rowGap}px` : undefined,
      'column-gap': this.columnGap ? `${this.columnGap}px` : undefined,
    };
  }
}
