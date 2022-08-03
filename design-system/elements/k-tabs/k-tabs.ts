import { ICustomElementViewModel, customElement, shadowCSS } from 'aurelia';

import css from './k-tabs.scss';
import template from './k-tabs.html';

@customElement({
  name: 'k-tabs',
  template,
  capture: true,
  shadowOptions: {
    mode: 'open',
  },
  dependencies: [shadowCSS(css)],
})
export class KTabs implements ICustomElementViewModel {}
