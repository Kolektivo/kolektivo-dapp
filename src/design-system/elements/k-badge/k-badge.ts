import { bindable, shadowCSS } from 'aurelia';
import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';

import { captureFilter } from '../../common';

import template from './k-badge.html';

import css from './k-badge.scss';

@customElement({
  name: 'k-badge',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KBadge implements ICustomElementViewModel {
  @bindable position: Position = 'bottom-start';
}
