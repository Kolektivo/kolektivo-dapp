import { ICustomElementViewModel, INode, IPlatform, bindable, customElement, shadowCSS } from 'aurelia';

import { captureFilter, numberToPixels } from '../../../design-system/common';
import css from './k-menu.scss';
import template from './k-menu.html';

@customElement({
  name: 'k-menu',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
  processContent: (node) => {
    const htmlNode = node as HTMLElement;
    if (htmlNode.hasAttribute('portal')) return;
    htmlNode.setAttribute('portal', 'document.body');
  },
})
export class KMenu implements ICustomElementViewModel {
  constructor(@IPlatform private readonly platform: IPlatform, @INode private readonly element: HTMLElement) {}
  private top?: number;
  private left?: number;
  private show = false;
  div?: HTMLElement;

  @bindable width?: number;
  @bindable target?: HTMLElement;
  @bindable title = '';
  @bindable position: Position = 'bottom-start';
  @bindable({ type: Number }) offset = 5;

  calcPos(): void {
    if (!this.target || !this.div) return;
    const clientRect = this.target.getBoundingClientRect();
    const y = this.platform.window.scrollY;
    switch (this.position) {
      case 'bottom':
        this.top = y + clientRect.top + clientRect.height + this.offset;
        this.left = clientRect.left + clientRect.width / 2 - this.div.clientWidth / 2;
        break;
      case 'bottom-end':
        this.top = y + clientRect.top + clientRect.height + this.offset;
        this.left = clientRect.left + clientRect.width - this.div.clientWidth;
        break;
      case 'bottom-start':
        this.top = y + clientRect.top + clientRect.height + this.offset;
        this.left = clientRect.left;
        break;
      case 'start':
        this.top = y + clientRect.top + clientRect.height / 2 - this.div.clientHeight / 2;
        this.left = clientRect.left - this.div.clientWidth - this.offset;
        break;
      case 'start-top':
        this.top = y + clientRect.top;
        this.left = clientRect.left - this.div.clientWidth - this.offset;
        break;
      case 'start-bottom':
        this.top = y + clientRect.top - this.div.clientHeight + clientRect.height;
        this.left = clientRect.left - this.div.clientWidth - this.offset;
        break;
      case 'end':
        this.top = y + clientRect.top + clientRect.height / 2 - this.div.clientHeight / 2;
        this.left = clientRect.left + clientRect.width + this.offset;
        break;
      case 'end-top':
        this.top = y + clientRect.top;
        this.left = clientRect.left + clientRect.width + this.offset;
        break;
      case 'end-bottom':
        this.top = y + clientRect.top - this.div.clientHeight + clientRect.height;
        this.left = clientRect.left + clientRect.width + this.offset;
        break;
      case 'top':
        this.top = y + clientRect.top - this.div.clientHeight - this.offset;
        this.left = clientRect.left + clientRect.width / 2 - this.div.clientWidth / 2;
        break;
      case 'top-end':
        this.top = y + clientRect.top - this.div.clientHeight - this.offset;
        this.left = clientRect.left + clientRect.width - this.div.clientWidth;
        break;
      case 'top-start':
        this.top = y + clientRect.top - this.div.clientHeight - this.offset;
        this.left = clientRect.left;
        break;
    }
  }
  attached(): void {
    if (!this.target) return;
    this.target.addEventListener('click', this.showEvent);
  }
  private closeEvent = (e: Event) => {
    if (e.target !== this.element && this.target !== e.target && !this.element.contains(e.target as HTMLElement)) {
      this.show = false;
      this.platform.window.removeEventListener('click', this.closeEvent);
    }
  };
  private showEvent = () => {
    const alreadyShowing = this.show;
    this.show = true;
    this.platform.taskQueue.queueTask(() => {
      this.calcPos();
      if (!alreadyShowing) {
        this.platform.window.addEventListener('click', this.closeEvent);
      }
    });
  };
  get style() {
    return {
      top: this.top && numberToPixels(this.top),
      left: this.left && numberToPixels(this.left),
      width: this.width && numberToPixels(this.width),
    };
  }
  detaching(): void {
    this.platform.window.removeEventListener('click', this.closeEvent);
    if (!this.target) return;
    this.target.removeEventListener('click', this.showEvent);
  }
}
