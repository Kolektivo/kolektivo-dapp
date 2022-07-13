import { CustomElement, ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { IfExistsThenTrue, noop } from './../../common';

import './k-modal.scss';
import template from './k-modal.html';

@customElement({ name: 'k-modal', template })
export class KModal implements ICustomElementViewModel {
  @bindable portalElement = 'body';
  @bindable ok: () => void;
  @bindable cancel: () => void;
  @bindable({ set: IfExistsThenTrue }) closeOnClick = false;
  constructor() {
    // you can inject the element or any DI in the constructor
  }

  overlayClicked() {
    this.closeOnClick && this.cancel?.();
  }
  cardClicked = noop;
}
(CustomElement.getDefinition(KModal) as { capture: boolean }).capture = true;
