import { customElement, shadowCSS } from 'aurelia';
import css from './k-button-group.scss';
import template from './k-button-group.html';

@customElement({
  name: 'k-button-group',
  template,
  capture: true,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KButtonGroup {}
