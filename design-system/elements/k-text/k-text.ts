import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { numberToPixels } from './../../common';

import css from './k-text.scss';

import template from './k-text.html';

@customElement({
  name: 'k-text',
  template,
  capture: true,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KText implements ICustomElementViewModel {
  @bindable tag = '';
  @bindable color = '';
  @bindable size?: string | number = undefined;

  get styles(): Record<string, unknown> {
    return { color: this.color, fontSize: this.size && numberToPixels(this.size) };
  }
}
