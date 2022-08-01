import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { ifExistsThenTrue, numberToPixelsInterceptor } from './../../common';
export type LoaderType = 'spinner';
export type LoaderFill = 'page' | 'parent';

import template from './k-loader.html';

@customElement({ name: 'k-loader', template, capture: true })
export class KLoader implements ICustomElementViewModel {
  @bindable type: LoaderType = 'spinner';
  @bindable fill: LoaderFill = 'page';
  @bindable({ set: numberToPixelsInterceptor }) size = '75';
  @bindable({ set: ifExistsThenTrue }) overlay = false;
  @bindable color = 'var(--primary-text)';
}
