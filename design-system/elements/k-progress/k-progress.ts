import { bindable, capture } from 'aurelia';
import { numberToPixelsInterceptor } from './../../common';
export type ProgressType = 'error' | 'warning';

@capture
export class KProgress {
  @bindable public max = 100;
  @bindable public value = 0;
  @bindable({ set: numberToPixelsInterceptor }) public height = '4px';
  @bindable public type = '';
  @bindable public color?: string;
  @bindable public background?: string;
  @bindable public subText?: string;

  get progressBarStyle(): Record<string, string | undefined> {
    return {
      width: `${(this.value / this.max) * 100}%`,
      backgroundColor: this.color,
      height: this.height,
    };
  }
  get barStyle(): Record<string, string | undefined> {
    return {
      backgroundColor: this.background,
      height: this.height,
    };
  }
}
