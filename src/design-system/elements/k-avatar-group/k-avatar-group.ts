import { bindable, customElement, IAuSlotsInfo, ICustomElementViewModel } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-avatar-group.html';

@customElement({
  name: 'k-avatar-group',
  template,
  capture: captureFilter,
})
export class KAvatarGroup implements ICustomElementViewModel {
  @bindable max = 3;
  @bindable total?: number;
  @bindable moreSize = 50;
  @bindable moreIcon = 'more_horiz';
  @bindable moreIconColor = 'var(--white)';
  @bindable moreColor = 'var(--concrete)';
  div?: HTMLElement;
  tooMany = false;
  constructor(@IAuSlotsInfo public readonly slotInfo: IAuSlotsInfo) {}
  attached(): void {
    if (!this.div) return;
    if (this.div.childElementCount > this.max) {
      for (let i = this.max - 1; i < this.div.childElementCount; i++) {
        this.div.children[i].remove();
      }
      this.tooMany = true;
    }
  }
}
