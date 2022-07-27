import { ICustomElementViewModel, bindable, capture } from 'aurelia';
import { numberToPixels } from './../../common';

@capture()
export class KText implements ICustomElementViewModel {
  @bindable tag = '';
  @bindable color = '';
  @bindable size?: string | number = undefined;

  get styles(): Record<string, unknown> {
    return { color: this.color, fontSize: this.size && numberToPixels(this.size) };
  }
}
