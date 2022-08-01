import { ButtonSize } from './../k-button/button-size';
import { ButtonType } from '../k-button';
import { ICustomElementViewModel, bindable } from 'aurelia';

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
