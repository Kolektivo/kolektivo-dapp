import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter, uid } from '../../common';

import css from './k-check.scss';

import template from './k-check.html';

@customElement({
  name: 'k-check',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KCheck implements ICustomElementViewModel {
  @bindable id = uid();
}
