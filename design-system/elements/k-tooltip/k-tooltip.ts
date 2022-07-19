import { ICustomElementViewModel, IPlatform, bindable } from 'aurelia';
import { numberToPixels } from './../../common';

export type TooltipPosition = 'top' | 'start' | 'end' | 'bottom';

export class KTooltip implements ICustomElementViewModel {
  @bindable message: string;
  @bindable host: HTMLElement;
  @bindable color = 'var(--don-juan-800)';
  @bindable position: TooltipPosition = 'top';
  left: string;
  top: string;
  compose: HTMLElement;

  constructor(@IPlatform private readonly platform: IPlatform, private readonly element: HTMLElement) {}

  attaching(): void {
    this.platform.window.addEventListener('resize', this.recalc);
  }

  recalc = (): void => {
    const horizontalAdjustment = this.position === 'start' ? 6 : this.position === 'end' ? -6 : 0;
    const verticalAdjustment = this.position === 'top' ? 6 : this.position === 'bottom' ? -5 : 0;
    this.top = numberToPixels(this.host.offsetTop - verticalAdjustment);
    this.left = numberToPixels(this.host.offsetLeft + this.host.offsetWidth / 2 - horizontalAdjustment);
  };

  attached(): void {
    (this.element.getRootNode() as HTMLElement).style.setProperty('--tooltip-color', 'red');
  }

  binding(): void {
    this.recalc();
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  get style() {
    return {
      top: this.top,
      left: this.left,
    };
  }
}
