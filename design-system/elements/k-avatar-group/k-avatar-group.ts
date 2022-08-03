import { IAuSlotsInfo, ICustomElementViewModel, bindable, customElement } from 'aurelia';

import 'style-loader!./k-avatar-group.scss';
import template from './k-avatar-group.html';

@customElement({
  name: 'k-avatar-group',
  template,
  capture: true,
})
export class KAvatarGroup implements ICustomElementViewModel {
  @bindable max = 3;
  @bindable total?: number;
  div?: HTMLElement;
  tooMany = false;
  constructor(@IAuSlotsInfo public readonly slotInfo: IAuSlotsInfo) {}
  attached(): void {
    if (!this.div) return;
    if (this.div.childElementCount > this.max) {
      for (let i = this.max; i < this.div.childElementCount; i++) {
        this.div.children[i].remove();
      }
      this.tooMany = true;
    }
  }
}
