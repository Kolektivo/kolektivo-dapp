import { customElement, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-button-group.html';

import css from './k-button-group.scss';

@customElement({
  name: 'k-button-group',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KButtonGroup {}
