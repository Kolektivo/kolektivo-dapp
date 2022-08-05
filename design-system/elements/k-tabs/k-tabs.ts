import { ICustomElementViewModel, customElement, shadowCSS } from 'aurelia';
import { captureFilter } from './../../common';

import css from './k-tabs.scss';
import template from './k-tabs.html';

@customElement({
  name: 'k-tabs',
  template,
  capture: captureFilter,
  shadowOptions: {
    mode: 'open',
  },
  dependencies: [shadowCSS(css)],
})
export class KTabs implements ICustomElementViewModel {}
