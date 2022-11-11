import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-tabs.html';

import css from './k-tabs.scss';

@customElement({
  name: 'k-tabs',
  template,
  capture: captureFilter,
  shadowOptions: {
    mode: 'open',
  },
  dependencies: [shadowCSS(css)],
})
export class KTabs implements ICustomElementViewModel {
  @bindable gap?: number;
}
