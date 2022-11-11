import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter, uid } from '../../common';

import template from './k-check.html';

import css from './k-check.scss';

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
