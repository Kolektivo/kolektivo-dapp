import { ICustomElementViewModel, bindable } from 'aurelia';

export class KColor implements ICustomElementViewModel {
  @bindable var?: string;
  copyCode(): void {
    this.var && void navigator.clipboard.writeText(`var(--${this.var})`);
  }
}
