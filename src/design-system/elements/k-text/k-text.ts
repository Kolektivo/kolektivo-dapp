import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter, numberToPixels } from '../../common';

import template from './k-text.html';

import css from './k-text.scss';

@customElement({
  name: 'k-text',
  template,
  capture: captureFilter,
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
