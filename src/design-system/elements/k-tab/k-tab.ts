import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter } from '../../common';

import css from './k-tab.scss';
import template from './k-tab.html';

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
