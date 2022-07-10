import { CustomElement, ICustomElementViewModel, bindable, customElement } from 'aurelia';

import './k-modal.scss';
import template from './k-modal.html';

@customElement({ name: 'k-modal', template })
export class KModal implements ICustomElementViewModel {
  @bindable portalElement = 'body';
  @bindable ok: () => void;
  @bindable cancel: () => void;
  @bindable closeOnClick = true;
  constructor() {
    // you can inject the element or any DI in the constructor
  }

  overlayClicked() {
    this.closeOnClick && this.cancel?.();
  }
}
(CustomElement.getDefinition(KModal) as { capture: boolean }).capture = true;
