import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-app-bar.html';

import css from './k-app-bar.scss';

@customElement({
  name: 'k-app-bar',
  template,
  capture: captureFilter,
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
