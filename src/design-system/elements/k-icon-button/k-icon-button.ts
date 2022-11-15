import { bindable, customElement, ICustomElementViewModel, shadowCSS } from 'aurelia';

import { captureFilter } from '../../common';
import type { ButtonType } from '../k-button';
import { ButtonSize } from '../k-button/button-size';

import template from './k-icon-button.html';

import css from './k-icon-button.scss';

@customElement({ name: 'k-icon-button', template, capture: captureFilter, dependencies: [shadowCSS(css)], shadowOptions: { mode: 'open' } })
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
