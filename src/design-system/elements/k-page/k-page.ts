import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter } from '../../common';

import css from './k-page.scss';
import template from './k-page.html';

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
