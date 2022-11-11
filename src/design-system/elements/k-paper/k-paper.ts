import { customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { Spaceable } from '../../base/spaceable';
import { captureFilter } from '../../common';

import template from './k-paper.html';

import css from './k-paper.scss';

@customElement({
  name: 'k-paper',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KPaper extends Spaceable implements ICustomElementViewModel {
  get style(): Record<string, string | undefined> {
    return this.spaceStyle;
  }
}
