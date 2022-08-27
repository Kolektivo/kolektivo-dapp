import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { captureFilter, ifExistsThenTrue, noop } from '../../common';

import './k-modal.scss';
import template from './k-modal.html';

@customElement({
  name: 'k-modal',
  template,
  capture: captureFilter,
  processContent: (node) => {
    const element = node as HTMLElement;
    if (element.hasAttribute('PORTAL')) return;
    element.setAttribute('portal', 'body');
  },
})
export class KModal implements ICustomElementViewModel {
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