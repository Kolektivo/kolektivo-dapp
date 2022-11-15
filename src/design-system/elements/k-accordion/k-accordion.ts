import { customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-accordion.html';

import css from './k-accordion.scss';

@customElement({
  name: 'k-accordion',
  template,
  capture: captureFilter,
  shadowOptions: {
    mode: 'open',
  },
  dependencies: [shadowCSS(css)],
})
export class KAccordion implements ICustomElementViewModel {}
