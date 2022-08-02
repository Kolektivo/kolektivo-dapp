import { ICustomElementViewModel, IPlatform, bindable, customElement, shadowCSS } from 'aurelia';
import { numberToPixels } from './../../common';

export type TooltipPosition = 'top' | 'start' | 'end' | 'bottom';

import css from './k-tooltip.scss';
import template from './k-tooltip.html';

@customElement({ name: 'k-tooltip', template, dependencies: [shadowCSS(css)], shadowOptions: { mode: 'open' } })
export class KTooltip implements ICustomElementViewModel {
  @bindable message?: string;
  @bindable host?: HTMLElement;
  @bindable color = 'var(--don-juan-800)';
  @bindable position: TooltipPosition = 'top';
  left?: string | number | null;
  top?: string | number | null;
  compose?: HTMLElement;

  constructor(@IPlatform private readonly platform: IPlatform, private readonly element: HTMLElement) {}

  attaching(): void {
    this.platform.window.addEventListener('resize', this.recalc);
  }

  recalc = (): void => {
    const horizontalAdjustment = this.position === 'start' ? 6 : this.position === 'end' ? -6 : 0;
    const verticalAdjustment = this.position === 'top' ? 6 : this.position === 'bottom' ? -5 : 0;
    if (this.host) {
      const clientRect = this.host.getBoundingClientRect();
      this.top = numberToPixels(clientRect.top - verticalAdjustment);
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
