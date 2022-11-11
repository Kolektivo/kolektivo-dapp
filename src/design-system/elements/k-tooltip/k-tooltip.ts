import { bindable, customElement, ICustomElementViewModel, INode, IPlatform, shadowCSS } from 'aurelia';

import { numberToPixels } from '../../common';

import template from './k-tooltip.html';

import css from './k-tooltip.scss';

@customElement({ name: 'k-tooltip', template, dependencies: [shadowCSS(css)], shadowOptions: { mode: 'open' } })
export class KTooltip implements ICustomElementViewModel {
  @bindable message?: string;
  @bindable host?: HTMLElement;
  @bindable color = 'var(--don-juan-800)';
  @bindable position: Position = 'top';
  left?: string | number | null;
  top?: string | number | null;
  compose?: HTMLElement;

  constructor(@IPlatform private readonly platform: IPlatform, @INode private readonly element: HTMLElement) {}

  attaching(): void {
    this.platform.window.addEventListener('resize', this.recalc);
  }

  recalc = (): void => {
    const horizontalAdjustment = this.position === 'start' ? 6 : this.position === 'end' ? -6 : 0;
    const verticalAdjustment = this.position === 'top' ? 6 : this.position === 'bottom' ? -10 : 0;
    if (this.host) {
      const clientRect = this.host.getBoundingClientRect();
      this.top = numberToPixels((this.position === 'bottom' ? clientRect.bottom : clientRect.top) - verticalAdjustment);
      this.left = numberToPixels(clientRect.left + this.host.offsetWidth / 2 - horizontalAdjustment);
    }
  };

  binding(): void {
    this.recalc();
  }

  detaching(): void {
    this.platform.window.removeEventListener('resize', this.recalc);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get style() {
    return {
      top: this.top,
      left: this.left,
      position: 'fixed',
    };
  }
}
