import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-alert.html';

import css from './k-alert.scss';

@customElement({
  name: 'k-alert',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KAlert implements ICustomElementViewModel {
  @bindable type: NotificationType = 'warning';
  @bindable icon = '';
  @bindable top = '';
  @bindable bottom = '';

  getIconName(): 'error_filled' | 'check_circle_filled' | 'warning_filled' | 'info_filled' {
    switch (this.type) {
      case 'danger':
        return 'error_filled';
      case 'success':
        return 'check_circle_filled';
      case 'warning':
        return 'warning_filled';
      case 'info':
        return 'info_filled';
      default:
        return 'check_circle_filled';
    }
  }

  get styles() {
    return {
      marginTop: this.top,
      marginBottom: this.bottom,
    };
  }
}
