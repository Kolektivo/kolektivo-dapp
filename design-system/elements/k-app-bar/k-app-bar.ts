import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';

import css from './k-app-bar.scss';
import template from './k-app-bar.html';

@customElement({
  name: 'k-app-bar',
  template,
  capture: true,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KAppBar implements ICustomElementViewModel {
  @bindable borderBottom = '';

  get gridStyle() {
    return {
      borderBottom: this.borderBottom,
    };
  }
}
