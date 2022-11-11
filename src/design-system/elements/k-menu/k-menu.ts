import { bindable, customElement, ICustomElementViewModel, INode, IPlatform, shadowCSS } from 'aurelia';

import { captureFilter, numberToPixels } from '../../common';

import template from './k-menu.html';

import css from './k-menu.scss';

import { ifExistsThenTrue } from 'design-system/common';

@customElement({
  name: 'k-menu',
  template,
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
  processContent: (node: INode) => {
    const htmlNode = node as HTMLElement;
    const useTarget = htmlNode.getAttribute('use-target');
    if (htmlNode.hasAttribute('portal') || (useTarget != undefined && useTarget !== 'false')) return;
    htmlNode.setAttribute('portal', 'document.body');
  },
})
export class KMenu implements ICustomElementViewModel {
  constructor(@IPlatform private readonly platform: IPlatform, @INode private readonly element: HTMLElement) {}
  private top?: number;
  private left?: number;
  div?: HTMLElement;

  @bindable width?: number;
  @bindable target?: HTMLElement;
  @bindable title = '';
  @bindable position: Position = 'bottom-start';
  @bindable({ type: Number }) offset = 5;
  @bindable maxHeight?: number;
  @bindable open = false;
  @bindable({ set: ifExistsThenTrue }) useTarget = false;

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
        if (this.useTarget) {
          this.top = clientRect.height + 9;
          this.left = 0;
        } else {
          this.top = y + clientRect.top + clientRect.height + this.offset;
          this.left = clientRect.left;
        }
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
  openChanged() {
    if (this.open) {
      this.platform.taskQueue.queueTask(() => {
        this.calcPos();
      });
      this.platform.taskQueue.queueTask(() => {
        this.platform.window.addEventListener('click', this.closeEvent);
      });
    } else {
      this.platform.window.removeEventListener('click', this.closeEvent);
    }
  }
  private closeEvent = (e: Event) => {
    if (e.target !== this.element && this.target !== e.target && !this.element.contains(e.target as HTMLElement)) {
      this.open = false;
    }
  };

  private showEvent = () => {
    this.open = true;
    this.platform.taskQueue.queueTask(() => {
      this.calcPos();
    });
  };

  get style() {
    return {
      top: this.top && numberToPixels(this.top),
      left: this.left && numberToPixels(this.left),
      width: this.width && numberToPixels(this.width),
      maxHeight: this.maxHeight && numberToPixels(this.maxHeight),
    };
  }
  detaching(): void {
    this.platform.window.removeEventListener('click', this.closeEvent);
    if (!this.target) return;
    this.target.removeEventListener('click', this.showEvent);
  }
}
