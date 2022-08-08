import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { captureFilter, ifExistsThenTrue, noop } from './../../common';

import 'style-loader!./k-modal.scss';
import template from './k-modal.html';

@customElement({ name: 'k-modal', template, capture: captureFilter })
export class KModal implements ICustomElementViewModel {
  @bindable portalElement = 'body';
  @bindable ok?: () => void;
  @bindable cancel?: () => void;
  @bindable({ set: ifExistsThenTrue }) closeOnClick = false;
  @bindable({ set: ifExistsThenTrue }) closeButton = false;
  @bindable okButtonText = 'Ok';
  @bindable cancelButtonText = 'Cancel';
  @bindable title = 'Are you sure?';

  overlayClicked(): void {
    this.closeOnClick && this.cancel?.();
  }
  cardClicked = noop;
}
