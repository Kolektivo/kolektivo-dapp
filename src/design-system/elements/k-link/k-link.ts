import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';
import { IRouter } from '@aurelia/router';

import template from './k-link.html';

import css from './k-link.scss';

import { captureFilter, ifExistsThenTrue } from 'design-system/common';

@customElement({
  name: 'k-link',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KLink implements ICustomElementViewModel {
  @bindable text?: string;
  @bindable src?: string;
  @bindable path?: string;
  @bindable({ set: ifExistsThenTrue }) small = false;
  @bindable({ set: ifExistsThenTrue }) external = false;
  @bindable copyText?: string;
  constructor(@IRouter private readonly router: IRouter) {}
}
