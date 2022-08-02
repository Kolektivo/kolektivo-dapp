import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';

import css from './k-page.scss';
import template from './k-page.html';

@customElement({
  name: 'k-page',
  template,
  capture: true,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KPage implements ICustomElementViewModel {
  @bindable title?: string;
}
