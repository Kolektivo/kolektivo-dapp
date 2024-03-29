import { customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-tab.html';
import css from './k-tab.scss?inline';

@customElement({
  name: 'k-tab',
  template,
  capture: (attr: string) => (attr === 'load' ? false : captureFilter(attr)),
  shadowOptions: {
    mode: 'open',
  },
  dependencies: [shadowCSS(css)],
})
export class KTab implements ICustomElementViewModel {}
