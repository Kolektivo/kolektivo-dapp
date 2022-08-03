import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';

import css from './k-tab.scss';
import template from './k-tab.html';

@customElement({
  name: 'k-tab',
  template,
  capture: true,
  shadowOptions: {
    mode: 'open',
  },
  dependencies: [shadowCSS(css)],
})
export class KTab implements ICustomElementViewModel {
  @bindable load = '';
  constructor() {
    // you can inject the element or any DI in the constructor
  }
}
