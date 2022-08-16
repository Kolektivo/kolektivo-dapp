import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import { bindable, shadowCSS } from 'aurelia';
import { captureFilter } from '../../common';
import css from './k-badge.scss';
import template from './k-badge.html';

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
