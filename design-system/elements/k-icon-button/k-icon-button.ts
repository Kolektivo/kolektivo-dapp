import { ButtonSize } from './../k-button/button-size';
import { ButtonType } from '../k-button';
import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';

import css from './k-icon-button.scss';
import template from './k-icon-button.html';

@customElement({ name: 'k-icon-button', template, capture: true, dependencies: [shadowCSS(css)] })
export class KIconButton implements ICustomElementViewModel {
  @bindable name = '';
  @bindable type: ButtonType = 'primary';
  @bindable size: ButtonSize | '' = '';

  get iconSize(): number {
    switch (this.size) {
      case 'xs':
        return 13;
      case 'sm':
        return 16;
      case 'lg':
        return 23;
      case 'xl':
        return 26;
      default:
        return 20;
    }
  }
}
