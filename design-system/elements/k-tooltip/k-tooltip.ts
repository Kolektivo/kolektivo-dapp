import { ICustomElementViewModel, IPlatform, bindable } from 'aurelia';
import { numberToPixels } from './../../common';

export type TooltipPosition = 'top' | 'start' | 'end' | 'bottom';

export class KTooltip implements ICustomElementViewModel {
  @bindable message: string;
  @bindable host: HTMLElement;
  @bindable position: TooltipPosition = 'top';
  left: string;
  top: string;

  constructor(@IPlatform private readonly platform: IPlatform) {}

  attaching() {
    this.platform.window.addEventListener('resize', this.recalc);
  }

  recalc = () => {
    this.top = numberToPixels(this.host.offsetTop);
    this.left = numberToPixels(this.host.offsetLeft + this.host.offsetWidth / 2);
  };

  binding() {
    this.recalc();
  }

  get style() {
    return {
      top: this.top,
      left: this.left,
    };
  }
}
