import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { NotificationType } from './../../services/notification/notification-type';
import { ifExistsThenTrue } from '../../../design-system/common';

import css from './k-chip.scss';
import template from './k-chip.html';

@customElement({
  name: 'k-chip',
  template,
  capture: true,
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
