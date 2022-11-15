import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-page.html';

import css from './k-page.scss';

@customElement({
  name: 'k-page',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KPage implements ICustomElementViewModel {
  @bindable title?: string;
  @bindable description?: string;
  @bindable learnMoreLink?: string;
}
