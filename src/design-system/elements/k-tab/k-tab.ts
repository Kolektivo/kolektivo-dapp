import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-tab.html';

import css from './k-tab.scss';

@customElement({
  name: 'k-tab',
  template,
  capture: captureFilter,
  shadowOptions: {
    mode: 'open',
  },
  dependencies: [shadowCSS(css)],
})
export class KTab implements ICustomElementViewModel {
  @bindable load = '';
}
