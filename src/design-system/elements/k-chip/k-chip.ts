import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter, ifExistsThenTrue } from '../../common';

import template from './k-chip.html';

import css from './k-chip.scss';

@customElement({
  name: 'k-chip',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KChip implements ICustomElementViewModel {
  @bindable type: NotificationType = 'primary';
  @bindable icon = '';
  @bindable({ set: ifExistsThenTrue }) border = false;
}
