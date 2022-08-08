import { ICustomElementViewModel, customElement, shadowCSS } from 'aurelia';
import { captureFilter } from './../../common';
import css from './k-accordion.scss';
import template from './k-accordion.html';

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
