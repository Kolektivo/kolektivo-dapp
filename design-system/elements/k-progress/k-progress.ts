import { CustomElement, bindable } from 'aurelia';
import { numberToPixels } from './../../common';
export type ProgressType = 'error' | 'warning';
export class KProgress {
  @bindable public max?: number = 100;
  @bindable public value?: number = 0;
  @bindable public height = 4;
  @bindable public type = '';
  @bindable public color?: string;
  @bindable public background?: string;
  @bindable public subText?: string;

  get progressBarStyle() {
    return `width:${(this.value / this.max) * 100}%;background-color:${this.color};height:${numberToPixels(this.height)}`;
  }
  get barStyle() {
    return `background-color:${this.background};height:${numberToPixels(this.height)}`;
  }
}
(CustomElement.getDefinition(KProgress) as { capture: boolean }).capture = true;